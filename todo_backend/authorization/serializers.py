from rest_framework import serializers
from django.contrib.auth.models import User
from todo.models import Todo


class UserSerializer(serializers.HyperlinkedModelSerializer):
    todos = serializers.HyperlinkedRelatedField(many=True, view_name='todo-detail', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'todos']
