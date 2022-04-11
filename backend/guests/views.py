from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GuestSerializer
from .models import Guest


class GuestView(viewsets.ModelViewSet):
    serializer_class = GuestSerializer
    queryset = Guest.objects.all()
