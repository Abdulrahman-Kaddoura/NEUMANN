from fastapi import FastAPI, HTTPException

app = FastAPI()

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