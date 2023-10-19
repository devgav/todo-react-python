from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Date
from sqlalchemy.orm import relationship

from ..db.base_class import Base

if TYPE_CHECKING:
    from .user import User  # noqa: F401


class Todo(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    completed = Column(Boolean, default=False)
    date_created = Column(Date, default=datetime.now())
    date_completed = Column(Date)
    owner_id = Column(Integer, ForeignKey("user.id"))

    owner = relationship("User", back_populates="todos")