import uuid
from io import BytesIO
from pathlib import Path

from fastapi import HTTPException, UploadFile, status
from PIL import Image, UnidentifiedImageError

from .config import settings

UPLOAD_ROOT = Path(settings.upload_dir)
PHOTOS_DIR = UPLOAD_ROOT / "photos"
STATIC_URL_PREFIX = f"/{settings.upload_dir}"

MAX_PHOTO_SIZE = settings.max_photo_size_mb * 1024 * 1024
MAX_PHOTO_DIMENSION = 512


async def save_employee_photo(file: UploadFile) -> str:
    contents = await file.read(MAX_PHOTO_SIZE + 1)
    if len(contents) > MAX_PHOTO_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Photo must be smaller than {settings.max_photo_size_mb}MB",
        )

    try:
        Image.open(BytesIO(contents)).verify()
        image = Image.open(BytesIO(contents)).convert("RGB")
    except (UnidentifiedImageError, OSError):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="File is not a valid image",
        )

    image.thumbnail((MAX_PHOTO_DIMENSION, MAX_PHOTO_DIMENSION))

    PHOTOS_DIR.mkdir(parents=True, exist_ok=True)
    filename = f"{uuid.uuid4().hex}.webp"
    image.save(PHOTOS_DIR / filename, format="WEBP", quality=85)

    return f"{STATIC_URL_PREFIX}/photos/{filename}"


def delete_employee_photo(photo_url: str | None) -> None:
    if not photo_url:
        return

    filename = Path(photo_url).name
    (PHOTOS_DIR / filename).unlink(missing_ok=True)
