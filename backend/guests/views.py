from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from utils.decode import get_jwt_data
from .serializers import GuestSerializer
from .models import Guest


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def guests(request):
    if request.method == "GET":
        user_id = get_jwt_data(request)["user_id"]
        guests = Guest.objects.filter(owner_id=user_id)
        serializer = GuestSerializer(guests, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        user_id = get_jwt_data(request)["user_id"]
        print(user_id)
        guest = request.data
        guest["owner_id"] = user_id
        serializer = GuestSerializer(data=guest)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def guest(request, guest_id):
    user_id = get_jwt_data(request)["user_id"]

    if request.method == "GET":
        try:
            my_guest = Guest.objects.get(owner_id=user_id, id=guest_id)
            serializer = GuestSerializer(my_guest, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PATCH":
        guestToPatch = Guest.objects.get(owner_id=user_id, id=guest_id)
        serializer = GuestSerializer(guestToPatch, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        try:
            guestToDelete = Guest.objects.get(owner_id=user_id, id=guest_id)
            guestToDelete.delete()
            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
