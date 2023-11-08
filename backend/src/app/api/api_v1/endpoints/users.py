from fastapi import APIRouter, Depends, HTTPException, Body
from fastapi.encoders import jsonable_encoder
from pydantic import EmailStr

from src.app import models, crud
from src.app.api import deps
from src.app import schemas
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/", response_model=schemas.User)
def create_user(*,
                db: Session = Depends(deps.get_db),
                user_in: schemas.UserCreate,
                ):
    """
    Retrieves the users of the current owner.
    :return:
        object:
    """
    user = crud.user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system."
        )
    user = crud.user.create(db, obj_in=user_in)
    return user


@router.get("/me", response_model=schemas.User)
def get_current_user(db: Session = Depends(deps.get_db),
                     current_user: models.User = Depends(deps.get_current_active_user)):
    """
    Retrieves the information of a single user.
    :arg:
        db: The active database session
        current_user: The current user
    :return:
        object: user
    """
    return current_user


@router.put("/me", response_model=schemas.User)
def update_user(*,
                db: Session = Depends(deps.get_db),
                password: str = Body(None),
                full_name: str = Body(None),
                email: EmailStr = Body(None),
                current_user: models.User = Depends(deps.get_current_active_user),
                ):
    """
    Update's a user give the user_id.
    :param db:
    :param password:
    :param full_name:
    :param email:
    :param current_user:
    :param user_id: The id of the user to update.
    :return: Updated user info.
    """
    current_user_data = jsonable_encoder(current_user)
    user_in = schemas.UserUpdate(**current_user_data)
    if password is not None:
        user_in.password = password
    if full_name is not None:
        user_in.full_name = full_name
    if email is not None:
        user_in.email = email
    user = crud.user.update(db, db_obj=current_user, obj_in=user_in)
    return user


@router.delete("/{user_id}", response_model=schemas.User)
def delete_user(*,
                db: Session = Depends(deps.get_db),
                current_user: models.User = Depends(deps.get_current_active_user),
                ):
    """
    Remove's a user given the user_id.
    :param db:
    :param current_user:
    :param user_id: The id of the user to remove.
    :return: The user that is removed.
    """
    user = crud.user.get(db=db, id=current_user.id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    user = crud.user.remove(db=db, id=current_user.id)
    return user
