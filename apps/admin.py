from django.contrib import admin

from .models import Category, Product, ImageProduct, Order, Review


class ImageProductStackedInline(admin.StackedInline):
    model = ImageProduct
    extra = 1
    max_num = 5
    min_num = 1


class ReviewStackedInline(admin.StackedInline):
    model = Review
    extra = 0
    max_num = 5
    min_num = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price')
    inlines = ImageProductStackedInline,


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    pass
