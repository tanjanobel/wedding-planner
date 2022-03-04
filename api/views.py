from django.shortcuts import render
from rest_framework import generics
from .serializers import TaskSerializer
from .models import Task


class TaskView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


