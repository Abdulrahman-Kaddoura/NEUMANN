from fastapi import FastAPI

app = FastAPI(title="NEUMANN api")

@app.get("/health")
def health_check() (
    return {'status': 'ok'}
)