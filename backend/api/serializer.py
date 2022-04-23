from distutils.log import error
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import re

from user.serializer import UserSerializer   


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        # ...
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', "first_name", "last_name")

    def validate(self, attrs):
        
        errors = {}

        if attrs['password'] != attrs['password2']:
            errors["password"] = "Die Passwörter stimmen nicht überein."

        email_regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        if not re.search(email_regex, attrs["username"]):
             errors["username"] = "Diese E-Mail Adresse ist nicht gültig."

        if 'first_name' not in attrs.keys() or len(attrs["first_name"]) < 1:
            errors["first_name"] = "Dieses Feld darf nicht leer sein."

        if 'last_name' not in attrs.keys() or len(attrs["last_name"]) < 1:
            errors["last_name"] = "Dieses Feld darf nicht leer sein."
        
        if len(errors.keys()) > 0:
            raise serializers.ValidationError(errors)

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'], 
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user
