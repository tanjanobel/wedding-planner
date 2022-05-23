from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/', include('user.urls')),
    path('api/', include('dashboard.urls')),
    path('api/', include('tasks.urls')),
    path('api/', include('guests.urls')),
    path('api/', include('budget.urls')),
]
