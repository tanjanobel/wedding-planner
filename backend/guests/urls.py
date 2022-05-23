from django.urls import path
from .views import guests, guest

urlpatterns = [
    path('guests', guests),
    path('guests/<str:guest_id>', guest),
]
