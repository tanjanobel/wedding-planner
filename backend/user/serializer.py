from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
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

        last_name = serializers.CharField(label="last_name",required=True, allow_blank=False, allow_null=False)
