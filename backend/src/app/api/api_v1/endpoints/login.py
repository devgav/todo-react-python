from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status, security
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from src.app import crud, models
from src.app.api import deps
from src.app.core.settings import settings
from src.app.core.security import create_access_token

router = APIRouter()


@router.post("/login/access-token")
def login_access_token(db: Session = Depends(deps.get_db),
                       form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Gives a user an access token when they log in
    """
    user = crud.user.authenticate(
        db=db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Incorrect email or password.")
    elif not crud.user.is_active(user):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Inactive User.")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {"access_token": create_access_token(user.id, expires_delta=access_token_expires),
            "token_type": "bearer"}


@router.post("/login/test-token")
def test_token(current_user: models.User = Depends(deps.get_current_user)):
    """
    Test current access token
    """
    return current_user
