from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from tasks.views import tasks
from user.views import getUser
from tasks.views import TaskStatusView
from guests.views import GuestView
from dashboard.views import statistics
from api.views import isAuthenticated

router = routers.DefaultRouter()
router.register(r'taskstatuses', TaskStatusView, 'taskstatuses')
router.register(r'guests', GuestView, 'guests')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('api.urls')),

    path('api/dashboard', statistics),
    path('api/tasks', tasks),
    path('api/auth', isAuthenticated),

    path("api/user", getUser)
]
