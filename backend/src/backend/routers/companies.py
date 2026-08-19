from fastapi import APIRouter, Depends

from ..constants import COMPANY_BRAND_COLORS
from ..core.deps import get_current_user

router = APIRouter(tags=["companies"], dependencies=[Depends(get_current_user)])


@router.get("/companies", response_model=list[str])
def list_companies():
    return list(COMPANY_BRAND_COLORS.keys())
