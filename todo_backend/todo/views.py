from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, filters

from fitlers.filters import IsOwnerFilterBackend
from permissions.permissions import IsOwner
from todo.models import Todo
from todo.serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    permission_classes = (
        permissions.IsAuthenticated,
        IsOwner
    )

    filter_backends = [filters.SearchFilter, filters.OrderingFilter, IsOwnerFilterBackend, DjangoFilterBackend]
    search_fields = ('title', 'description')
    filterset_fields = ('completed',)
    ordering_fields = ('created',)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return super().get_queryset()
