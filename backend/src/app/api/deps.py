# Enter necessary dependencies here.
# For reference use this
# https://github.com/tiangolo/full-stack-fastapi-postgresql/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/backend/app/app/api/deps.py
from src.app.db.session import SessionLocal


def get_db():
    db = None
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_active_user():
    return "Current User"
