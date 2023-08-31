from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from authorization.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, permissions.IsAuthenticatedOrReadOnly)
