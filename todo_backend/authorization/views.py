from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions, mixins
from django.contrib.auth.models import User
from authorization.serializers import UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, permissions.IsAuthenticatedOrReadOnly)


class RegisterViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)
