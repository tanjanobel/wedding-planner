from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from user.serializer import UserSerializer


# /api/user
@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def my_user(request):
    if request.method == "GET":
        user = User.objects.get(id=request.user.id)    
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    if request.method == "PATCH":
        # overwrite user
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
