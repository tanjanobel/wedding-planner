from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from utils.decode import get_jwt_data
from tasks.serializers import TaskSerializer
from guests.models import Guest, GuestStatus
from tasks.models import Task, TaskStatus


@api_view(['GET'])
def statistics(request):
    payload = get_jwt_data(request)
    if payload == None:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    user_id = payload["user_id"]   
    next_tasks = Task.objects.filter(
        status__in=[TaskStatus.OFFEN, TaskStatus.IN_ARBEIT], owner_id=user_id).order_by("duedate")
    serializer = TaskSerializer(next_tasks, many=True)

    if request.method == "GET":
        return Response(
            {
                "tasks_total_count": Task.objects.filter(owner_id=user_id).count(),
                "tasks_done_count": Task.objects.filter(status=TaskStatus.ERLEDIGT, owner_id=user_id).count(),
                "guests_total_count": Guest.objects.filter(owner_id=user_id).count(),
                "guests_confirmed_count": Guest.objects.filter(status=GuestStatus.ZUSAGE, owner_id=user_id).count(),
                "next_tasks": serializer.data
            }
        )
