from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from src.app.api.api_v1.api import api_router
from src.app.core.settings import settings

app = FastAPI(
    title='todo app'
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=settings.ALLOW_METHODS,
    allow_headers=settings.ALLOW_HEADERS,
)

app.include_router(api_router, prefix=settings.API_V1_STR)
