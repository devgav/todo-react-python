from typing import Any, Dict, Union

from sqlalchemy.orm import Session

from src.app.crud.base import CRUDBase
from src.app.models.user import User
from src.app.schemas.user import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):

    def get_by_email(self, db: Session, *, email: str) -> User:
        return db.query(User).filter(User.email == email).first()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        db_obj = User(
            email=obj_in.email,
            hashed_password=obj_in.password + "hashed-password",
            full_name=obj_in.full_name,
            is_superuser=obj_in.is_superuser,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]) -> User:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)
        if update_data["password"]:
            hashed_password = update_data["password"] + 'hashed-password'
            del update_data["password"]
            update_data["hashed-password"] = hashed_password
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def is_superuser(self, user: User):
        return user.is_superuser

    def is_active(self, user: User):
        return user.is_active


user = CRUDUser(User)
