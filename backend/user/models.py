import datetime
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserProfileManager


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Represents a user profile"""
    email = models.EmailField(
        max_length=255,
        unique=True,
        verbose_name='E-Mail Adresse'
    )
    first_name = models.CharField(
        max_length=255,
        verbose_name='Vorname'
    )
    last_name = models.CharField(
        max_length=255,
        verbose_name='Nachname'
    )
    cover_image = models.TextField(
        blank=True,
        null=True,
        verbose_name='Titelbild'
    )
    wedding_date = models.DateField(
        blank=True,
        default=datetime.date.today,
        verbose_name='Hochzeitsdatum'
    )
    wedding_city = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name='Hochzeitsort'
    )
    wedding_budget = models.DecimalField(
        blank=True,
        default=0,
        max_digits=8,
        decimal_places=2,
        verbose_name='Hochzeitsbudget',
    )
    bride = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name='Braut'
    )
    groom = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name='Bräutigam'
    )
    maid_of_honor = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name='Trauzeugin'
    )
    best_man = models.CharField(
        max_length=255,
        blank=True,
        default="",
        verbose_name='Trauzeuge'
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email
