from pydantic import BaseModel

class PostCreate(BaseModel):
    text: str

class PostResponse(BaseModel):
    text: str