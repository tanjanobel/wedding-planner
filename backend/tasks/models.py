import uuid
from django.db import models
from django.utils import timezone


class Task(models.Model):
    OFFEN = 'Offen'
    IN_ARBEIT = "In Arbeit"
    ERLEDIGT = "Erledigt"
    STATUS = [
        (OFFEN, "Offen"),
        (IN_ARBEIT, "In Arbeit"),
        (ERLEDIGT, "Erledigt"),
    ]
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True,
    )
    status = models.CharField(
        max_length=32,
        choices=STATUS,
        default=OFFEN,
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
    duedate = models.DateField(
        blank=True,
        null=True,
        verbose_name="Fällig am",
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
        verbose_name = "Aufgabe"
        verbose_name_plural = "Aufgaben"
        ordering = ["duedate"]

    def __str__(self):
        return self.title
