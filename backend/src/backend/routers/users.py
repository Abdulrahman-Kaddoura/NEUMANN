from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..core.deps import require_role
from ..db.database import get_db
from ..db.models import User
from ..schemas import UserListOut

router = APIRouter(
    prefix="/users", tags=["users"], dependencies=[Depends(require_role("admin"))]
)


@router.get("", response_model=UserListOut)
def list_users(db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.id).all()
    return UserListOut(items=users)
