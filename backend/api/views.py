from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from user.models import UserProfile
from rest_framework.permissions import AllowAny, IsAuthenticated
import jwt


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def isAuthenticated(request):
    if request.method == 'GET':
        if "Authorization" not in request.headers.keys():
            return Response({"detail": "No token provided"}, status.HTTP_401_UNAUTHORIZED)
        jwtToken = request.headers["Authorization"].split()[1]
        payload = jwt.decode(jwtToken, 
            "django-insecure-#9j3dw!%gawgx(#5^ar$+m67q23x+ql3=vw*79e2n+8w_#tsh#",
            algorithms=["HS256"])
        username = payload['username']
        return Response({'username': username}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)
