from datetime import datetime
from typing import Optional

from pydantic import BaseModel


# Shared properties
class TodoBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date_completed: Optional[datetime]
    completed: bool = False


# Properties to receive on Todo creation
class TodoCreate(TodoBase):
    title: str
    description: str


# Properties to receive on Todo update
class TodoUpdate(TodoBase):
    date_completed: datetime


# Properties shared by models stored in DB
class TodoInDBBase(TodoBase):
    id: int
    title: str
    owner_id: int
    date_created: datetime = datetime.now()

    class Config:
        from_attributes = True


# Properties to return to client
class Todo(TodoInDBBase):
    pass


# Properties stored in DB
class TodoInDB(TodoInDBBase):
    pass
