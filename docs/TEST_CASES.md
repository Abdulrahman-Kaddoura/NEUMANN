# Test Cases

Backend: `backend/tests/` (pytest, SQLite in-memory test DB). Run with:
```
cd backend
.venv/Scripts/python.exe -m pytest -q
```

Frontend: `frontend/src/**/*.test.{ts,tsx}` (Vitest + RTL, MSW mocked API). Run with:
```
cd frontend
npm run test:run
```

## Auth

| Scenario | Steps | Expected | Actual | Pass/Fail |
|---|---|---|---|---|
| Register new account | POST /auth/register, unique email, valid password | 201 + access token | same | Pass |
| Register duplicate email | Register twice with same email | 409 | same | Pass |
| Register short password | Password < 8 chars | 422 | same | Pass |
| Register with role=admin | RegisterRequest only allows editor/viewer | 422 | same | Pass |
| Login correct credentials | POST /auth/login | 200 + access token | same | Pass |
| Login wrong password | Correct email, wrong password | 401 | same | Pass |
| Login unknown email | Email never registered | 401 | same | Pass |
| GET /auth/me valid token | Authenticated request | 200, user data | same | Pass |
| GET /auth/me no token | No Authorization header | 401 | same | Pass |
| GET /auth/me bad token | Garbage bearer token | 401 | same | Pass |
| Login page, valid creds | Fill form, submit | Redirects to / | same | Pass |
| Login page, invalid creds | Fill form, submit | Inline error shown, no redirect | same | Pass |
| Session persists | Log in, remount AuthProvider | Still authenticated | same | Pass |

## Employees

| Scenario | Steps | Expected | Actual | Pass/Fail |
|---|---|---|---|---|
| List without auth | GET /employees, no token | 401 | same | Pass |
| List employees | Seed 2, GET /employees | 200, total 2 | same | Pass |
| Search filter | GET /employees?search=Venere | Only match returned | same | Pass |
| Company filter | GET /employees?company=Chemel | Only that company returned | same | Pass |
| Pagination | Seed 5, page=2&page_size=2 | 2 items, total 5 | same | Pass |
| Invalid sort field | GET /employees?sort=notAField | 400 | same | Pass |
| Empty result | GET /employees, none seeded | total 0, items [] | same | Pass |
| Get by id | GET /employees/{id} | 200, matches | same | Pass |
| Get missing id | GET /employees/999999 | 404 | same | Pass |
| Create as viewer | POST /employees, role=viewer | 403 | same | Pass |
| Create as editor | POST /employees, valid payload | 201 | same | Pass |
| Client-set brandColor ignored | POST with brandColor in body | Server value used, not client's | same | Pass |
| Create missing required field | POST without firstName | 422 | same | Pass |
| Create unknown company | POST with invalid company | 422 | same | Pass |
| Create duplicate email | POST reusing existing email | 409 | same | Pass |
| Update as viewer | PUT /employees/{id}, role=viewer | 403 | same | Pass |
| Update as editor | PUT with valid payload | 200, updated | same | Pass |
| Update missing id | PUT /employees/999999 | 404 | same | Pass |
| Update email taken by another | PUT reusing another employee's email | 409 | same | Pass |
| Delete as viewer | DELETE /employees/{id}, role=viewer | 403 | same | Pass |
| Delete as editor | DELETE, then GET same id | 204, then 404 | same | Pass |
| Delete missing id | DELETE /employees/999999 | 404 | same | Pass |
| Card renders in grid | Render Dashboard | Employee card visible, clickable | same | Pass |
| Add employee (form) | Open + Add, fill fields, submit | "Employee Created!", dialog closes | same | Pass |
| Edit employee (form) | Click card, edit, submit | Form pre-filled, "Employee Edited!" | same | Pass |
| Delete employee (form) | Click card, delete, confirm | "Employee deleted!", dialog closes | same | Pass |
| Client-side email format validation | isValidEmail on bad/good strings | true only for valid emails | same | Pass |
| Client-side required field validation | isBlank on empty/whitespace/real strings | true only when blank | same | Pass |
| Debounced search | Rapid input changes | Only final value used | same | Pass |
| Pagination hook | Change page | Correct slice + totalPages | same | Pass |

## Companies

| Scenario | Steps | Expected | Actual | Pass/Fail |
|---|---|---|---|---|
| List without auth | GET /companies, no token | 401 | same | Pass |
| List companies | GET /companies, authed | 200, known companies present | same | Pass |

## Users (admin panel)

| Scenario | Steps | Expected | Actual | Pass/Fail |
|---|---|---|---|---|
| List without auth | GET /users, no token | 401 | same | Pass |
| List as non-admin | GET /users, role=editor | 403 | same | Pass |
| List as admin | Seed 2 users, GET /users | 200, both returned | same | Pass |

## Health

| Scenario | Steps | Expected | Actual | Pass/Fail |
|---|---|---|---|---|
| Liveness check | GET /health | 200, {"status":"ok"} | same | Pass |

## Notes

- Backend: 38/38 passing. Frontend: 43/43 passing.
- `require_role("editor")` gates create/update/delete on employees — an `admin`
  user gets 403 on all three. The API contract in TRAINING_SPEC.pdf marks DELETE
  as admin-only; the code as written only allows editor. Flagging in case that's
  not intentional.
- `EmployeeCreate.email` / `EmployeeUpdate.email` are plain `str`, not validated
  server-side for format (client-side `isValidEmail` catches it in the UI, but
  the API itself will accept a malformed email).
