from fastapi import APIRouter

router = APIRouter()


@router.post("/")
def login_access_token():
    """
    Gives a user an access token when they log in
    """
    return {"message": "Login Access Token"}


@router.post("/login/test-token")
def test_token():
    """
    Test current access token
    """
    return {"message": "Access Token"}
