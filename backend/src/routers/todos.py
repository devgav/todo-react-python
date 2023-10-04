from fastapi import APIRouter

router = APIRouter(
    prefix="/todos",
    tags=["todos"],
    responses={404: {"description": "Not found"}},
)


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
