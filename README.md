# Running the app

## Prerequisites

- Docker
- Python 3.14+ with [uv]
- Node.js 18+ with npm

## 1. Database

```
cp .env.example .env
docker compose up -d
```

## 2. Backend

```
cd backend
cp .env.example .env
(To seed the database)
uv run alembic upgrade head
uv run python -m backend.db.seed
uv run uvicorn backend.main:app --reload --port 8000
```

## 3. Frontend

```
cd frontend
cp .env.example .env
npm install
npm run dev
```
