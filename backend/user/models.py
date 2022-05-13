from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .managers import UserProfileManager


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Represents a user profile"""
    username = models.CharField(max_length=255, unique=True, default=None)
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        """Django uses this when it needs to convert the object to a string"""

        return self.email
