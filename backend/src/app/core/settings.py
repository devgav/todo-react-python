import secrets

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    SECRET_KEY: str = secrets.token_urlsafe(32)
    API_V1_STR: str = "/api/v1"


settings = Settings()
