from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_all_users():
    """
    Retrieves the users of the current owner.
    :return:
        object:
    """
    return {"message": "Hello users"}


@router.get("/{user_id}")
def get_user(user_id: int):
    """
    Retrieves the information of a single user.
    :arg:
        user_id: id of the user object.
    :return:
        object: user
    """
    return {"user": f"Information about one one user {user_id}"}


@router.delete("/{user_id}")
def delete_user(user_id: int):
    """
    Remove's a user given the user_id.
    :param user_id: The id of the user to remove.
    :return: The user that is removed.
    """
    return {"user": f"This is the user that we deleted {user_id}"}


@router.put("/{user_id}")
def update_user(user_id: int):
    """
    Update's a user give the user_id.
    :param user_id: The id of the user to update.
    :return: Updated user info.
    """
    return {"user": f"This is the user that we are updating {user_id}"}