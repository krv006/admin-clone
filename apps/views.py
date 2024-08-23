from django.db.models import Max
from django.views.generic import ListView, DetailView

from apps.models import Category, Product


# Create your views here.

class HomeListView(ListView):
    queryset = Category.objects.all()
    template_name = 'apps/product/home.html'
    context_object_name = 'categories'

    def get_queryset(self):
        latest_products = Product.objects.all().order_by('-created_at')[:8]
        qs = Category.objects.filter(products__in=latest_products).distinct()
        qs = qs.annotate(latest_product_date=Max('products__created_at'))
        ordering = self.request.GET.get('ordering', '-latest_product_date')
        qs = qs.order_by(ordering)
        return qs


class ProductListView(ListView):
    queryset = Product.objects.prefetch_related('images').all()
    template_name = 'apps/product/product-list.html'
    context_object_name = 'products'

    def get_image(self, product):
        image = product.images.first()
        print(image)
        if image:
            return image.image.url
        print(image)
        return '/path/to/default/image.jpg'


class ProductDetailDetailView(DetailView):
    queryset = Product.objects.all()
    template_name = 'apps/product/product-detail.html'
    context_object_name = 'product'

    def get_queryset(self):
        qs = super().get_queryset()

        if ordering := self.request.GET.get('-ordering'):
            qs = qs.order_by(ordering)
        return qs
