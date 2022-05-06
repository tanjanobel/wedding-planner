import uuid
from django.db import models
from django.utils import timezone


class GuestStatus(models.TextChoices):
    AUSSTEHEND = 'Ausstehend', 'Ausstehend'
    ZUSAGE = 'Zusage', 'Zusage'
    ABSAGE = 'Absage', 'Absage'


class Guest(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True,
    )
    status = models.CharField(
        max_length=32,
        choices=GuestStatus.choices,
        default=GuestStatus.AUSSTEHEND,
        verbose_name="Status",
    )
    firstname = models.CharField(
        max_length=100,
        verbose_name="Vorname",
    )
    lastname = models.CharField(
        max_length=100,
        verbose_name="Nachname",
    )
    street = models.CharField(
        blank=True,
        max_length=100,
        verbose_name="Strasse",
    )
    zip = models.CharField(
        blank=True,
        max_length=4,
        verbose_name="PLZ",
    )
    city = models.CharField(
        blank=True,
        max_length=100,
        verbose_name="Ort",
    )
    email = models.EmailField(
        blank=True,
        max_length=100,
        verbose_name="E-Mail Adresse",
    )
    phone = models.CharField(
        blank=True,
        max_length=10,
        verbose_name="Telefonnummer",
    )
    description = models.TextField(
        blank=True,
        verbose_name="Notizen",
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
    owner_id = models.IntegerField(
        default=0,
        blank=False,
        verbose_name="UserID"
    )

    class Meta:
        verbose_name = "Gast"
        verbose_name_plural = "Gäste"

    def __str__(self):
        return self.firstname
