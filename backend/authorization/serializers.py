from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

UserModel = get_user_model()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    todo = serializers.HyperlinkedRelatedField(many=True, view_name='todo-detail', read_only=True)

    def create(self, validated_data):
        user = UserModel.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'url', 'todo']
