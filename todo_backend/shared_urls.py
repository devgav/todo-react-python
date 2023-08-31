from django.urls import include, path
from rest_framework import routers

from authorization.views import UserViewSet
from todo.views import TodoViewSet

router = routers.SimpleRouter()
router.register(r'user', UserViewSet)
router.register(r'todo', TodoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]