from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from user.models import UserProfile
from user.serializer import UserSerializer


# /api/user
@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def my_user(request):
    """Get and patch user profile"""
    if request.method == 'GET':
        user = UserProfile.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'PATCH':
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)