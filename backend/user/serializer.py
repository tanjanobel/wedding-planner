from rest_framework import serializers
from user.models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        extra_kwargs = {
            'id': {'read_only': True},
            'password': {'read_only': True},
            'last_login': {'read_only': True},
            'is_superuser': {'read_only': True},
            'username': {'read_only': True},
            'email': {'read_only': True},
            'is_staff': {'read_only': True},
            'is_active': {'read_only': True},
            'date_joined': {'read_only': True},
            'groups': {'read_only': True},
            'user_permissions': {'read_only': True},
        }
        model = UserProfile
        fields = '__all__'
