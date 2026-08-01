from fastapi import FastAPI, HTTPException
from app.schemas import PostCreate, PostResponse
from app.db import Post, create_db_and_tables, get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

text_posts = {
    1: {"text": "hello"},
    2: {"text": "hi"},
    3: {"text": "good morning"},
    4: {"text": "what's up"},
    5: {"text": "fastapi is fun"},
    6: {"text": "learning uv today"},
    7: {"text": "postgres setup done"},
    8: {"text": "async is tricky"},
    9: {"text": "almost done with the api"},
    10: {"text": "goodnight"},
}

@app.get("/posts")
def get_all_posts(limit: int = None):
    if limit:
        return dict(list(text_posts.items())[:limit])
    return text_posts


@app.get("/posts/{id}")
def get_post(id: int):
    if id not in text_posts:
        return HTTPException(status_code=404, detail="Post not found")
    return text_posts.get(id)

@app.post("/posts")
def create_post(post: PostCreate) -> PostResponse:
    new_post = {"text": post.text}
    text_posts[max(text_posts.keys()) + 1] = new_post
    return new_post

