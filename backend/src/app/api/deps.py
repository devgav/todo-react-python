# Enter necessary dependencies here.
# For reference use this
# https://github.com/tiangolo/full-stack-fastapi-postgresql/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/backend/app/app/api/deps.py
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from src.app import crud, models
from src.app.core.settings import Settings
from src.app.db.session import SessionLocal

reuable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{Settings.API_V1_STR}/login/access-token"
)


def get_db():
    db = None
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_user(
        db: Session = Depends(get_db)
) -> models.User:
    user = crud.user.get(db, id=1)
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")
    return user


def get_current_active_user(
        current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not crud.user.is_active(current_user):
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user


def get_current_active_superuser(
        current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not crud.user.is_superuser(current_user):
        raise HTTPException(
            status_code=400, detail="The user doesn't have enough privileges"
        )
    return current_user
