from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import TaskSerializer, TaskStatusSerializer
from .models import Task, TaskStatus
from utils.decode import get_jwt_data


class TaskStatusView(viewsets.ModelViewSet):
    serializer_class = TaskStatusSerializer
    queryset = TaskStatus.choices


@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def tasks(request):
    if request.method == "GET":
        user_id = get_jwt_data(request)["user_id"]
        tasks = Task.objects.filter(owner_id=user_id)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        user_id = get_jwt_data(request)["user_id"]
        print(user_id)
        task = request.data
        task["owner_id"] = user_id
        serializer = TaskSerializer(data=task)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "PATCH":
        if "id" not in request.data.keys():
            return Response({"id": ["id is required"]})
        taskToPatch = Task.objects.get(pk=request.data["id"])
        user_id = get_jwt_data(request)["user_id"]
        if taskToPatch.owner_id != user_id:
            return Response({"error": "Task doesn't belong to authenticated user"}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = TaskSerializer(taskToPatch, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "DELETE":
        try:
            if "id" not in request.data.keys():
                return Response({"id": ["id is required"]})

            taskToDelete = Task.objects.get(pk=request.data["id"])

            user_id = get_jwt_data(request)["user_id"]
            if taskToDelete.owner_id != user_id:
                return Response({"error": "Task doesn't belong to authenticated user"}, status=status.HTTP_401_UNAUTHORIZED)

            taskToDelete.delete()
            return Response(status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({"error": ["Task doesn't exist"]}, status=status.HTTP_404_NOT_FOUND)

