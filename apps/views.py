from django.shortcuts import render
from django.views.generic import TemplateView, ListView

from apps.models import Category


# Create your views here.

class HomeListView(ListView):
    queryset = Category.objects.all()
    template_name = 'apps/home.html'
    context_object_name = 'categories'
