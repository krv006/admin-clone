from django.shortcuts import render
from django.views.generic import TemplateView, ListView, DetailView

from apps.models import Category, Product, ImageProduct


# Create your views here.

class HomeListView(ListView):
    queryset = Category.objects.all()
    template_name = 'apps/product/home.html'
    context_object_name = 'categories'

    # def get_image(self, category):
    #     if category.image:
    #         print(category.image)
    #         return category.image.url
    #     else:
    #         pass


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
        return '/path/to/default/image.jpg'  # Replace with your actual default image path


class ProductDetailDetailView(DetailView):
    queryset = Product.objects.all()
    template_name = 'apps/product/product-detail.html'
    context_object_name = 'product'
