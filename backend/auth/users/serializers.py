from rest_framework.serializers import (ModelSerializer,CharField)
from rest_framework.exceptions import ValidationError
from .models import User


class UserSerializer(ModelSerializer):
    password2 = CharField(label='Confirm Password', write_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2']
        
        # Don't sent password
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        confirm_password = validated_data.pop('password2', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            if password == confirm_password:
                instance.set_password(password)
            else:
                raise ValidationError({'password':['Passwords must match']})
        instance.save()
        return instance

class AllUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', "image"]