# Import all the models, so that Base has them before being
# imported by Alembic
from src.app.db.base_class import Base  # noqa
from src.app.models.todo import Todo  # noqa
from src.app.models.user import User  # noqa