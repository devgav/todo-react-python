from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.app import models, crud
from src.app.api import deps
from src.app import schemas

router = APIRouter()


@router.get("/")
def get_all_todos():
    """
    Retrieves the todos of the current owner.
    :return:
        object:
    """
    return {"message": "Hello Todos"}


@router.get("/{todo_id}")
def get_todo(todo_id: int):
    """
    Retrieves the information of a single todo.
    :arg:
        todo_id: id of the todo object.
    :return:
        object: todo
    """
    return {"todo": f"Information about one one todo {todo_id}"}


@router.post("/", response_model=schemas.Todo)
def create_todo(
        *,
        db: Session = Depends(deps.get_db),
        todo_in: schemas.TodoCreate,
        current_user: models.User = Depends(deps.get_current_active_user)
):
    """
    Create new todo
    """
    todo = crud.todo.create_with_owner(db=db, obj_in=todo_in, owner_id=current_user)
    return todo


@router.delete("/{todo_id}")
def delete_todo(todo_id: int):
    """
    Remove's a todo given the todo_id.
    :param todo_id: The id of the todo to remove.
    :return: The todo that is removed.
    """
    return {"todo": f"This is the todo that we deleted {todo_id}"}


@router.put("/{todo_id}")
def update_todo(todo_id: int):
    """
    Update's a todo give the todo_id.
    :param todo_id: The id of the todo to update.
    :return: Updated todo info.
    """
    return {"todo": f"This is the todo that we are updating {todo_id}"}