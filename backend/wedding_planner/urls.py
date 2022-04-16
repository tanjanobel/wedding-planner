from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from tasks.views import TaskView, TaskStatusView
from guests.views import GuestView

from dashboard.views import statistics

router = routers.DefaultRouter()
router.register(r'tasks', TaskView, 'tasks')
router.register(r'taskstatuses', TaskStatusView, 'taskstatuses')
router.register(r'guests', GuestView, 'guests')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/dashboard', statistics),
]
