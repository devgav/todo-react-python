from fastapi.encoders import jsonable_encoder
from sqlalchemy import and_
from sqlalchemy.orm import Session

from src.app.crud.base import CRUDBase
from src.app.models.todo import Todo
from src.app.schemas.todo import TodoCreate, TodoUpdate


class CRUDTodo(CRUDBase[Todo, TodoCreate, TodoUpdate]):
    def create_with_owner(self, db: Session, *, obj_in: TodoCreate, owner_id: int) -> Todo:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, owner_id=owner_id)  # type: ignore
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_by_owner(self, db: Session, *, owner_id: int, query_id: int):
        filter_condition = and_(self.model.id == query_id, owner_id == self.model.owner_id)
        return db.query(self.model).filter(filter_condition).first()

    def get_multi_by_owner(self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 0):
        return (
            db.query(self.model)
            .filter(Todo.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )


todo = CRUDTodo(Todo)
