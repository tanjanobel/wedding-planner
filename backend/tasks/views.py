from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TaskSerializer, TaskStatusSerializer
from .models import Task, TaskStatus


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    print("janksd")


class TaskStatusView(viewsets.ModelViewSet):
    serializer_class = TaskStatusSerializer
    queryset = TaskStatus.choices
