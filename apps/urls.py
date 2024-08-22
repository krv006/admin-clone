from django.urls import path

from apps.views import HomeListView, ProductListView, ProductDetailDetailView

urlpatterns = [
    path('', HomeListView.as_view(), name='home'),

    path('product/', ProductListView.as_view(), name='product-list-page'),
    path('product/<int:pk>/', ProductDetailDetailView.as_view(), name='product-detail-page'),
]
