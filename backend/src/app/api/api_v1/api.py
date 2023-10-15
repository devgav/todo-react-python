from fastapi import APIRouter

from src.app.api.api_v1.endpoints import todos, users, login

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(todos.router, prefix="/todos", tags=["todos"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
