from fastapi import APIRouter

from ..constants import COMPANY_BRAND_COLORS

router = APIRouter(tags=["companies"])


@router.get("/companies", response_model=list[str])
def list_companies():
    return list(COMPANY_BRAND_COLORS.keys())
