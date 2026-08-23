# Running the app

## Prerequisites

- Docker
- Python 3.14+ with [uv]
- Node.js 22.23.2+ with npm(im using 24.16.0)

## 1. Database

```
cp .env.example .env
docker compose up -d
```

## 2. Backend

```
cd backend
cp .env.example .env
(To seed the database :
uv run alembic upgrade head
uv run python -m backend.db.seed )
uv run uvicorn backend.main:app --reload --port 8000
```

## 3. Frontend

```
cd frontend
cp .env.example .env
npm install
npm run dev
```

## 4. urls:
app: http://localhost:5173
docs: http://localhost:8000/docs
health: http://localhost:8000/health 


## 5. login info:
email: admin@mail.com
password: admin123

view@mail.com
temppass

edit@mail.com
temppass

you can also create your own account now