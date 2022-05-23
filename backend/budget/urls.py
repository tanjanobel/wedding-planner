from django.urls import path
from .views import expenses, expense

urlpatterns = [
    path('budget', expenses),
    path('budget/<str:expense_id>', expense),
]
