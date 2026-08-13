from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import companies, employees



app = FastAPI(title="NEUMANN api")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(employees.router)
app.include_router(companies.router)

@app.get("/health")
def health_check(): 
    return {'status': 'ok'}
