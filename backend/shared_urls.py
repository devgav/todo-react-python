from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from authorization.views import UserViewSet, RegisterViewSet
from todo.views import TodoViewSet

router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'todos', TodoViewSet)
router.register(r'register', RegisterViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
