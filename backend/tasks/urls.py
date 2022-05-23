from django.urls import path
from .views import tasks, task

urlpatterns = [
    path('tasks', tasks),
    path('tasks/<str:task_id>', task),
]
