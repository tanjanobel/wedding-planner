from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api.views import is_authenticated
from user.views import my_user
from dashboard.views import statistics
from tasks.views import task, tasks
from guests.views import guest, guests
from budget.views import expense, expenses

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('api.urls')),

    path('api/auth', is_authenticated),
    path('api/user', my_user),

    path('api/dashboard', statistics),

    path('api/tasks', tasks),
    path('api/tasks/<str:task_id>', task),

    path('api/guests', guests),
    path('api/guests/<str:guest_id>', guest),

    path('api/budget', expenses),
    path('api/budget/<str:expense_id>', expense),
]
