from django import forms
from .models import Order
from django.forms import ModelForm
from apps.models import Stream


class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['name', 'phone_number', 'region']

    def __init__(self, *args, **kwargs):
        # Extract the product from kwargs if it exists
        self.product = kwargs.pop('product', None)
        super().__init__(*args, **kwargs)

    def save(self, commit=True):
        order = super().save(commit=False)
        if self.product:
            order.product = self.product
        if commit:
            order.save()
        return order


class StreamForm(ModelForm):
    class Meta:
        model = Stream
        fields = 'name', 'discount', 'product', 'user'
