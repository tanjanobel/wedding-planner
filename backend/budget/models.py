import uuid
from django.db import models
from django.utils import timezone


class BudgetStatus(models.TextChoices):
    OFFEN = 'Offen', 'Offen'
    BEZAHLT = 'Bezahlt', 'Bezahlt'


class Budget(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True,
    )
    status = models.CharField(
        max_length=32,
        choices=BudgetStatus.choices,
        default=BudgetStatus.OFFEN,
        verbose_name="Status",
    )
    title = models.CharField(
        max_length=100,
        verbose_name="Titel",
    )
    description = models.TextField(
        max_length=500,
        blank=True,
        verbose_name="Notizen",
    )
    budget = models.DecimalField(
        blank=True,
        null=True,
        max_digits=6,
        decimal_places=2,
        verbose_name="Budget",
    )
    date = models.DateTimeField(
        auto_now_add=True,
    )
    created = models.DateField(
        default=timezone.now().strftime("%Y-%m-%d"),
        verbose_name="Erstellt am",
    )
    changed = models.DateTimeField(
        auto_now=True,
        verbose_name="Geändert am",
    )

    class Meta:
        verbose_name = "Ausgabe"
        verbose_name_plural = "Ausgaben"

    def __str__(self):
        return self.title
