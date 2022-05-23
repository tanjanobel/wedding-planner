from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from utils.decode import get_jwt_data
from .serializers import TaskSerializer
from .models import Task


# /api/tasks
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def tasks(request):
    """Get all tasks and post new task by user id"""
    if request.method == 'GET':
        user_id = get_jwt_data(request)['user_id']
        tasks = Task.objects.filter(owner_id=user_id)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        user_id = get_jwt_data(request)['user_id']
        print(user_id)
        task = request.data
        task['owner_id'] = user_id
        serializer = TaskSerializer(data=task)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /api/tasks/<task_id>
@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def task(request, task_id):
    """Get, patch and delete single task by user id and task uuid"""
    user_id = get_jwt_data(request)['user_id']

    if request.method == 'GET':
        try:
            my_task = Task.objects.get(owner_id=user_id, id=task_id)
            serializer = TaskSerializer(my_task, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PATCH':
        task_to_patch = Task.objects.get(owner_id=user_id, id=task_id)
        serializer = TaskSerializer(task_to_patch, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        try:
            task_to_delete = Task.objects.get(owner_id=user_id, id=task_id)
            task_to_delete.delete()
            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
