from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from budget.views import BudgetView
from api.views import isAuthenticated
from user.views import my_user
from dashboard.views import statistics
from tasks.views import task, tasks, TaskStatusView
from guests.views import guest, guests

router = routers.DefaultRouter()
router.register(r'taskstatuses', TaskStatusView, 'taskstatuses')
router.register(r'budget', BudgetView, 'budget')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('api.urls')),

    path('api/auth', isAuthenticated),
    path("api/user", my_user),

    path('api/dashboard', statistics),

    path('api/tasks', tasks),
    path('api/tasks/<str:task_id>', task),

    path('api/guests', guests),
    path('api/guests/<str:guest_id>', guest),
]
