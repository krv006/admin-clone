import uuid

from django.db import models
from django.db.models import Model, DateTimeField, UUIDField, CharField, SlugField, ImageField, DecimalField, \
    ForeignKey, CASCADE, TextChoices, EmailField, TextField

from django.utils.text import slugify


class CreatedAtBase(Model):
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Base(CreatedAtBase):
    # id = UUIDField(primary_key=True, db_default=RandomUUID(), editable=False) # postgres da ishlatiladi
    id = UUIDField(default=uuid.uuid4, primary_key=True)  # sqlite uchun basic

    class Meta:
        abstract = True


class BaseSlugModel(Base):
    name = CharField(max_length=255)
    slug = SlugField(unique=True)

    class Meta:
        abstract = True

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.slug = slugify(self.name)
        while self.__class__.objects.filter(slug=self.slug).exists():
            self.slug += '-1'
        super().save(force_insert, force_update, using, update_fields)

    def __str__(self):
        return self.name


class Category(BaseSlugModel):
    image = ImageField(upload_to='category-image/')


class Product(BaseSlugModel):
    name = CharField(max_length=255)
    price = DecimalField(max_digits=7, decimal_places=2, default=0)


class ImageProduct(Model):
    image = ImageField(upload_to='products/%Y/%m/%d/')
    video = models.FileField(upload_to='products/videos/%Y/%m/%d/', blank=True, null=True)
    product = ForeignKey('apps.Product', CASCADE, related_name='images')

    def __str__(self):
        return f"ImageProduct for {self.product}"


class Order(CreatedAtBase):
    class Region(TextChoices):
        ANDIJON = "andijon", "Andijon"
        BUXORO = "buxoro", "Buxoro"
        FARGONA = "fargona", "Farg'ona"
        JIZZAX = "jizzax", "Jizzax"
        XORAZM = "xorazm", "Xorazm"
        NAMANGAN = "namangan", "Namangan"
        NAVOIY = "navoiy", "Navoiy"
        QASHQADARYO = "qashqadaryo", "Qashqadaryo"
        QORAQALPOGISTON = "qoraqalpogiston", "Qoraqalpog'iston"
        SAMARQAND = "samarqand", "Samarqand"
        SIRDARYO = "sirdaryo", "Sirdaryo"
        SURXONDARYO = "surxondaryo", "Surxondaryo"
        TOSHKENT = "toshkent", "Toshkent"

    product = ForeignKey('apps.Product', CASCADE, to_field='slug', related_name='orders')
    name = CharField(max_length=50)
    phone_number = CharField(max_length=50)
    region = CharField(max_length=255, choices=Region.choices)



class Review(Model):
    name = CharField(max_length=255)
    email = EmailField(max_length=255, null=True, blank=True)
    description = TextField()
    comment_status = TextField()
    created_at = DateTimeField(auto_now_add=True)
    product = ForeignKey('apps.Product', CASCADE, related_name='reviw')

    def __str__(self):
        return self.name