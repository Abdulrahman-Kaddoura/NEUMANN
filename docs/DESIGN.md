# Design

## Architecture

```
React (Vite, port 5173)  <-- fetch/JSON, JWT bearer -->  FastAPI (uvicorn)  <-->  PostgreSQL
```

Frontend never talks to the database directly. All state that outlives a page
load (employees, users, auth) goes through the REST API and TanStack Query.
Client-only state (search box text before debounce, which panel is open,
sidebar collapsed) stays in React state.

## Component tree

```
App
├─ ProtectedRoute (redirects to /login if no token)
│  └─ Dashboard
│     ├─ Navbar (logo, search, theme toggle, + Add, logout)
│     ├─ Sidebar (company checkbox filter, mobile search/logout)
│     ├─ EmployeeGrid
│     │  └─ EmployeeCard (per employee)
│     ├─ EmployeeGridSkeleton (loading state)
│     ├─ EmployeeDetails (slide-in panel, view mode)
│     ├─ AddEmployeeForm (slide-in panel, add mode)
│     ├─ EditEmployeeForm (slide-in panel, edit mode)
│     ├─ ConfirmDelete (confirmation dialog)
│     ├─ AdminFAB (floating button, admin role only)
│     └─ UsersPanel (admin role only)
│        └─ UsersTable
├─ LoginPage
├─ SignUpPage
├─ Terms
└─ Unknown (404)
```

`AuthProvider` wraps the whole app (in `main.tsx`) and exposes `useAuth()`
(`token`, `user`, `login`, `logout`) to any component. `ThemeProvider` does the
same for light/dark mode.

Employee data flows through hooks in `src/hooks/employee/`: `useEmployees`
(list, with search/company/page params), `useCreateEmployee`,
`useEditEmployee`, `useDeleteEmployee` — each a TanStack Query
query/mutation that invalidates the employees cache on success so the grid
updates without a full reload.

## API contract

Base URL: `http://localhost:8000`. All bodies are JSON, camelCase (Pydantic
`alias_generator=to_camel`). Auth via `Authorization: Bearer <jwt>`.

| Method | Path | Auth | Body | Response |
|---|---|---|---|---|
| POST | /auth/register | none | `{fullName, email, password, role: "editor"\|"viewer"}` | `{accessToken, tokenType}` (201) |
| POST | /auth/login | none | `{email, password}` | `{accessToken, tokenType}` |
| GET | /auth/me | required | — | `{id, email, fullName, role}` |
| GET | /employees | required | query: `search, company[], page, pageSize, sort` | `{items[], total, page, pageSize}` |
| GET | /employees/{id} | required | — | employee object |
| POST | /employees | role=editor | `{firstName, lastName, company, jobTitle, email?, address, city, county}` | employee object (201) |
| PUT | /employees/{id} | role=editor | same as POST | employee object |
| DELETE | /employees/{id} | role=editor | — | 204 |
| GET | /companies | required | — | `string[]` |
| GET | /users | role=admin | — | `{items: [{id, email, fullName, role}]}` |
| GET | /health | none | — | `{status: "ok"}` |

Employee object: `{id, firstName, lastName, company, jobTitle, email, address, city, county, brandColor}`.

`brandColor` is never accepted from the client — the server looks it up from
`COMPANY_BRAND_COLORS` by `company` and overwrites whatever was sent.

Error responses: 401 (no/bad token), 403 (wrong role), 404 (not found), 409
(duplicate email), 422 (validation), 400 (bad `sort` field).

## Database schema

```
employees
  id            int, PK
  first_name    varchar(100)
  last_name     varchar(100)
  company       varchar(150)
  job_title     varchar(150)
  email         varchar(255), unique, nullable
  address       varchar(255)
  city          varchar(100)
  county        varchar(100)
  brand_color   varchar(7)

users
  id               int, PK
  email            varchar(255), unique
  hashed_password  varchar(255)
  full_name        varchar(200)
  role             varchar(20), default "admin"
```

No foreign keys between the two tables — users and employees are unrelated
entities (a user is a directory operator, not necessarily an employee).
Migrations are managed with Alembic (`backend/alembic/versions/`).

## Auth & roles

JWT (HS256, `python-jose`), 8-hour expiry, subject = user email. Passwords
hashed with bcrypt, never stored or logged in plaintext.

Three roles exist on `User.role`: `admin`, `editor`, `viewer`.
- `admin`: full employee CRUD (including photo upload/delete), plus can view
  `/users` (the admin panel). `require_role("editor", "admin")` gates the
  employee-mutating endpoints — this used to allow only `editor`, which
  contradicted the API-contract table (see `docs/TEST_CASES.md`); fixed to
  match the spec.
- `editor`: full employee CRUD, no access to `/users`.
- `viewer`: read-only on employees, no access to `/users`.

Self-registration (`/auth/register`) only allows `editor`/`viewer` — you
cannot register your way to `admin`. Admin accounts are seeded directly
(`backend/src/backend/db/seed_user.py`).

## Key decisions & trade-offs

- **PostgreSQL over MySQL**: matches the training spec's default recommendation
  and the SQLAlchemy/Alembic setup is DB-agnostic either way, so there was no
  real cost to picking Postgres.
- **Brand color is derived, not stored per-request**: `COMPANY_BRAND_COLORS`
  is a fixed dict in `constants.py`, keyed by company. This keeps a company's
  color consistent across every employee and closes off a way for a client to
  set an arbitrary color per employee.
- **Client-side search/filter, server-side pagination**: search and company
  filtering happen server-side (`GET /employees` query params) since the data
  is already paginated from the DB; this differs from the "Month 1: client-side
  is fine" allowance in the spec but was simple enough to do server-side from
  the start.
- **AI usage**: scaffolding for the pytest suite (`backend/tests/`) and the
  `docs/TEST_CASES.md` / `docs/DESIGN.md` documents were generated with Claude
  Code from the existing implementation, then reviewed against the actual
  route/model code rather than assumed correct.

## Observability & hardening (§8.12)

- **Request logging**: `main.py` has an HTTP middleware (`log_requests`) that
  logs method, path, status code, and duration in ms for every request, via a
  `backend.requests` logger.
- **Rate limiting**: `/auth/login` is limited to 5 requests/minute per client
  IP via `slowapi` (`core/limiter.py`). Exceeding it returns 429. In-memory
  storage — fine for a single-process dev/demo deployment, would need a shared
  backend (e.g. Redis) behind multiple workers/instances.
- **Input sanitization**: email fields (`LoginRequest`, `RegisterRequest`,
  `EmployeeCreate`/`EmployeeUpdate`) now use Pydantic's `EmailStr` instead of
  plain `str`, so malformed emails are rejected with 422 at the API boundary,
  not just caught by the frontend's `isValidEmail`.
- **Secrets**: `backend/.env` is gitignored (`**/.env` in the root
  `.gitignore`) and was never committed; `backend/.env.example` documents the
  required variables with placeholder values only.
