import uuid
from django.db import models
from django.db.models import F
from django.utils import timezone


class TaskStatus(models.TextChoices):
    """Represents the task status"""
    OFFEN = 'Offen', 'Offen'
    IN_ARBEIT = 'In Arbeit', 'In Arbeit'
    ERLEDIGT = 'Erledigt', 'Erledigt'


class Task(models.Model):
    """Represents a task"""
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True,
    )
    status = models.CharField(
        max_length=32,
        choices=TaskStatus.choices,
        default=TaskStatus.OFFEN,
        verbose_name='Status',
    )
    title = models.CharField(
        max_length=100,
        verbose_name='Titel',
    )
    description = models.TextField(
        max_length=500,
        blank=True,
        verbose_name='Notizen',
    )
    duedate = models.DateField(
        blank=True,
        null=True,
        verbose_name='Fällig am',
    )
    date = models.DateTimeField(
        auto_now_add=True,
    )
    created = models.DateField(
        default=timezone.now().strftime('%Y-%m-%d'),
        verbose_name='Erstellt am',
    )
    changed = models.DateTimeField(
        auto_now=True,
        verbose_name='Geändert am',
    )
    owner_id = models.IntegerField(
        default=0,
        blank=False,
        verbose_name='UserID'
    )

    class Meta:
        verbose_name = 'Aufgabe'
        verbose_name_plural = 'Aufgaben'
        ordering = [F('duedate').asc(nulls_last=True)]

    def __str__(self):
        return self.title
