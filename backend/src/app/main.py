from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from src.app.api.api_v1.api import api_router

app = FastAPI(
    title='todo app'
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins='http://localhost:8000',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
