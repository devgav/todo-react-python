import secrets

from pydantic_settings import BaseSettings
from typing_extensions import List


class Settings(BaseSettings):
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    SECRET_KEY: str = secrets.token_urlsafe(32)
    API_V1_STR: str = "/api/v1"

    ALLOW_ORIGINS: List[str] = ["http://localhost:8000"]
    ALLOW_METHODS: List[str] = ["*"]
    ALLOW_HEADERS: List[str] = ["*"]


settings = Settings()
