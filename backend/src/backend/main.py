from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth, companies, employees, users



app = FastAPI(title="NEUMANN api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router)
app.include_router(employees.router)
app.include_router(companies.router)
app.include_router(users.router)

@app.get("/health")
def health_check(): 
    return {'status': 'ok'}
