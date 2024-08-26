import re

from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Max
from django.shortcuts import render, redirect
from django.views.generic import ListView, DetailView
from django.views.generic import TemplateView

from apps.models import Category, Product
from apps.models import User


# Create your views here.

class HomeListView(ListView):
    queryset = Product.objects.all()
    template_name = 'apps/product/home.html'
    context_object_name = 'categories'

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.GET.get('search')
        if search:
            queryset = queryset.filter(name__icontains=search)
        return queryset

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        category_id = self.request.GET.get('category')
        if category_id:
            context['categories'] = Category.objects.filter(parent_id=category_id)
        else:
            context['categories'] = Category.objects.all()

        return context


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

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.GET.get('category'):
            queryset = queryset.filter(category_id=self.request.GET.get('category'))
        return queryset

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(object_list=object_list, **kwargs)
        context['categories'] = Category.objects.all()
        return context


class ProductDetailView(DetailView):
    queryset = Product.objects.all()
    template_name = 'apps/product/product-detail.html'
    context_object_name = 'product'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


class ContactView(LoginRequiredMixin, TemplateView):
    template_name = 'apps/profile/contacts.html'


class ProfileView(LoginRequiredMixin, TemplateView):
    template_name = 'apps/profile/profile.html'


class AdminDashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'apps/profile/sections/dashboard.html'


class AdminMarketView(LoginRequiredMixin, TemplateView):
    template_name = 'apps/profile/sections/market.html'


class AdminStreamView(LoginRequiredMixin, TemplateView):
    template_name = 'apps/profile/sections/stream.html'


class AdminStatisticsView(LoginRequiredMixin, TemplateView):
    template_name = 'apps/profile/sections/statistics.html'


class AdminPaymentView(LoginRequiredMixin, TemplateView):
    template_name = 'apps/profile/sections/payment.html'


class CustomLoginView(TemplateView):
    template_name = 'apps/auth/login.html'

    def post(self, request, *args, **kwargs):
        phone_number = re.sub(r'\D', '', request.POST.get('phone_number', ''))
        user = User.objects.filter(phone_number=phone_number).first()

        if len(phone_number) < 10:
            context = {
                "messages_error": ["Invalid phone number"]
            }
            return render(request, self.template_name, context)
            # send_email

        if not user:
            user = User.objects.create_user(phone_number=phone_number, password=request.POST.get('password'))
            login(request, user)
            return redirect('home')

        user = authenticate(request, username=user.phone_number, password=request.POST.get('password'))
        if user:
            login(request, user)
            next_url = request.GET.get('next', 'home')
            return redirect(next_url)
        else:
            context = {
                "messages_error": ["Invalid password"]
            }
            return render(request, self.template_name, context)

# TODO celery bn qivoramiz
