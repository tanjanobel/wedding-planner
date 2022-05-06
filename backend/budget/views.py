from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from utils.decode import get_jwt_data
from .serializers import BudgetSerializer
from .models import Budget, BudgetStatus


class BudgetStatusView(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer
    queryset = BudgetStatus.choices


# /api/budget
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def expenses(request):
    if request.method == "GET":
        user_id = get_jwt_data(request)["user_id"]
        expenses = Budget.objects.filter(owner_id=user_id)
        serializer = BudgetSerializer(expenses, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        user_id = get_jwt_data(request)["user_id"]
        print(user_id)
        expense = request.data
        expense["owner_id"] = user_id
        serializer = BudgetSerializer(data=expense)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# /api/budget/<expense_id>
@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def expense(request, expense_id):
    user_id = get_jwt_data(request)["user_id"]

    if request.method == "GET":
        try:
            my_expense = Budget.objects.get(owner_id=user_id, id=expense_id)
            serializer = BudgetSerializer(my_expense, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PATCH":
        expenseToPatch = Budget.objects.get(owner_id=user_id, id=expense_id)
        serializer = BudgetSerializer(expenseToPatch, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        try:
            expenseToDelete = Budget.objects.get(owner_id=user_id, id=expense_id)
            expenseToDelete.delete()
            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
