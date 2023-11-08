from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from src.app import models, crud
from src.app.api import deps
from src.app import schemas

router = APIRouter()


@router.get("/", response_model=List[schemas.Todo])
def get_multi_todos(
        skip: int | None = None,
        limit: int = 10,
        db: Session = Depends(deps.get_db),
        current_user=Depends(deps.get_current_active_user),
):
    """
    Retrieves the todos of the current owner.
    params = skip
    """
    print(current_user.id)
    return crud.todo.get_multi_by_owner(db=db, owner_id=current_user.id, skip=skip, limit=limit)


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
    todo = crud.todo.create_with_owner(db=db, obj_in=todo_in, owner_id=current_user.id)
    return todo


@router.get("/{todo_id}", response_model=schemas.Todo)
def get_todo(
        todo_id: int,
        db: Session = Depends(deps.get_db),
        current_user=Depends(deps.get_current_active_user)
):
    """
    Retrieves the information of a single todo.
    :arg:
        todo_id: id of the todo object.
        db: database session.
        current_user: the current user
    :return:
        object: todo
    """
    todo = crud.todo.get(db=db, id=todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Item not found")
    if not crud.user.is_superuser(current_user) and (todo.owner_id != current_user.id):
        raise HTTPException(status_code=404, detail="Not enough permissions")
    return todo


@router.delete("/{todo_id}", response_model=schemas.Todo)
def delete_todo(
                *,
                todo_id: int,
                db: Session = Depends(deps.get_db),
                current_user: models.User = Depends(deps.get_current_active_user)):
    """
    Remove's a todo given the todo_id.
    :param current_user: The current user
    :param db: The database session
    :param todo_id: The id of the todo to remove.
    :return: The todo that is removed.
    """
    todo = crud.todo.get(db=db, id=id)
    if not todo:
        raise HTTPException(status_code=404,
                            detail="Todo not found.")
    if (not crud.user.is_superuser(current_user) and
            (todo.owner_id != current_user.id)):
        raise HTTPException(status_code=400,
                            detail="Not enough permissions")
    todo = crud.todo.remove(db=db, id=todo_id)
    return todo


@router.put("/{todo_id}", response_model=schemas.Todo)
def update_todo(
                *,
                db: Session = Depends(deps.get_db),
                todo_id: int,
                todo_in: schemas.TodoUpdate,
                current_user: models.User = Depends(deps.get_current_active_user)
                ):
    """
    Update's a todo give the todo_id.
    :param todo_in: The todo we are taking in
    :param current_user: The current active user
    :param db: The database session
    :param todo_id: The id of the todo to update.
    :return: Updated todo info.
    """
    todo = crud.todo.get(db=db, id=todo_id)
    is_superuser = crud.user.is_superuser(current_user)
    if not todo:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    if not is_superuser and todo.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Not enough permissions")
    todo = crud.todo.update(db=db, db_obj=todo, obj_in=todo_in)
    return todo
