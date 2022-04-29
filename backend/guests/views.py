from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import GuestSerializer
from .models import Guest
from utils.decode import get_jwt_data


@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
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

    if request.method == "PATCH":
        if "id" not in request.data.keys():
            return Response({"id": ["id is required"]})
        guestToPatch = Guest.objects.get(pk=request.data["id"])
        user_id = get_jwt_data(request)["user_id"]
        if guestToPatch.owner_id != user_id:
            return Response({"error": "Guest doesn't belong to authenticated user"}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = GuestSerializer(guestToPatch, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        try:
            if "id" not in request.data.keys():
                return Response({"id": ["id is required"]})

            guestToDelete = Guest.objects.get(pk=request.data["id"])

            user_id = get_jwt_data(request)["user_id"]
            if guestToDelete.owner_id != user_id:
                return Response({"error": "Guest doesn't belong to authenticated user"},
                                status=status.HTTP_401_UNAUTHORIZED)

            guestToDelete.delete()
            return Response(status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({"error": ["Guest doesn't exist"]}, status=status.HTTP_404_NOT_FOUND)

