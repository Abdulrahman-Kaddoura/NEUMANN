import logging
import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from .core.limiter import limiter
from .core.storage import UPLOAD_ROOT, STATIC_URL_PREFIX
from .routers import auth, companies, employees, users

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("backend.requests")

app = FastAPI(title="NEUMANN api")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - start) * 1000
    logger.info(
        "%s %s -> %s (%.1fms)",
        request.method,
        request.url.path,
        response.status_code,
        duration_ms,
    )
    return response


UPLOAD_ROOT.mkdir(parents=True, exist_ok=True)
app.mount(STATIC_URL_PREFIX, StaticFiles(directory=UPLOAD_ROOT), name="uploads")

app.include_router(auth.router)
app.include_router(employees.router)
app.include_router(companies.router)
app.include_router(users.router)

@app.get("/health")
def health_check():
    return {'status': 'ok'}
