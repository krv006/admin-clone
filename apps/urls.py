from django.urls import path

from apps.views import HomeListView

urlpatterns = [
    path('', HomeListView.as_view(), name='home'),
]
