from django.urls import path
from .views import my_user

urlpatterns = [
    path('user', my_user),
]
