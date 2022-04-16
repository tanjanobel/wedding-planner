from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from guests.models import GuestStatus

from tasks.models import TaskStatus
from guests.models import Guest
from tasks.models import Task

from tasks.serializers import TaskSerializer


@api_view(['GET', 'POST'])
def statistics(request):
    next_tasks = Task.objects.filter(status=TaskStatus.OFFEN).order_by("duedate")
    serializer = TaskSerializer(next_tasks, many=True)

    print(serializer.data)

    if request.method == "GET":
        return Response(
            {
                "tasks_total_count": Task.objects.all().count(),
                "tasks_open_count": Task.objects.filter(status=TaskStatus.ERLEDIGT).count(),
                "guests_total_count": Guest.objects.all().count(),
                "guests_confirmed_count": Guest.objects.filter(status=GuestStatus.ZUSAGE).count(),
                "next_tasks": serializer.data
            }
        )