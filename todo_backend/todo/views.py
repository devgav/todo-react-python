from rest_framework import viewsets, permissions
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

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        Todo.objects.filter(owner=self.request.user)
