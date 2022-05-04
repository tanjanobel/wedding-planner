from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from user.views import getUser
from tasks.views import TaskView, TaskStatusView
from guests.views import GuestView
from budget.views import BudgetView

from dashboard.views import statistics
from api.views import isAuthenticated
from api.views import isAuthenticated

router = routers.DefaultRouter()
router.register(r'tasks', TaskView, 'tasks')
router.register(r'taskstatuses', TaskStatusView, 'taskstatuses')
router.register(r'guests', GuestView, 'guests')
router.register(r'budget', BudgetView, 'budget')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('api.urls')),

    path('api/dashboard', statistics),
    path('api/auth', isAuthenticated),

    path("api/user", getUser)
]
