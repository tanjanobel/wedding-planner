from rest_framework import viewsets
from .serializers import BudgetSerializer
from .models import Budget


class BudgetView(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer
    queryset = Budget.objects.all()
