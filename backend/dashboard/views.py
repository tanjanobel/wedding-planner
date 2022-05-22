from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from budget.models import Budget
from user.serializer import UserSerializer
from user.models import UserProfile
from utils.decode import get_jwt_data
from tasks.serializers import TaskSerializer
from guests.models import Guest, GuestStatus
from tasks.models import Task, TaskStatus
from datetime import datetime
from django.db.models import Sum


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

        user = UserProfile.objects.get(id=user_id)
        user_serializer = UserSerializer(user)

        # Calculcate days until wedding
        date_format = "%Y-%m-%d"
        wedding_date = datetime.strptime(user_serializer.data["wedding_date"], date_format)
        today = datetime.today()
        days_until_wedding = (wedding_date - today).days

        return Response(
            {
                "tasks_total_count": Task.objects.filter(owner_id=user_id).count(),
                "tasks_done_count": Task.objects.filter(status=TaskStatus.ERLEDIGT, owner_id=user_id).count(),
                "guests_total_count": Guest.objects.filter(owner_id=user_id).count(),
                "guests_confirmed_count": Guest.objects.filter(status=GuestStatus.ZUSAGE, owner_id=user_id).count(),
                "days_until_wedding": days_until_wedding,
                "wedding_budget_total": user_serializer.data["wedding_budget"],
                "wedding_budget_spent": Budget.objects.filter(owner_id=user_id).aggregate(total=Sum('budget'))["total"],

                "next_tasks": serializer.data
            }
        )
