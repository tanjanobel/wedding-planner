from django.contrib.auth.base_user import BaseUserManager


class UserProfileManager(BaseUserManager):
    """Helps Django work with our custom user model"""
    def create_user(self, email, first_name, last_name, password=None):
        """Creates a new user profile object"""
        if not email:
            raise ValueError('Users must have an email address.')

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, first_name, last_name, password):
        """"Create and saves a new superuser with given details"""
        user = self.create_user(email, first_name, last_name, password)

        user.is_superuser = True
        user.is_staff = True

        user.save()

        return user
