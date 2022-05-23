from django.urls import path
from .views import statistics

urlpatterns = [
    path('dashboard', statistics),
]
