# Neumann Directory — Status & Remaining Work (Month 2)

Scope: full-stack (React/TS frontend + FastAPI backend), per `TRAINING_SPEC.pdf`.
This replaces the old Month-1 planning doc — Month 1 is done and then some;
what follows is what's actually left, checked against the spec and the repo.

---

## Done (Month 1 core + Month 2 items already shipped)

- [x] Auth: register/login/me, JWT, bcrypt hashing, `ProtectedRoute`.
- [x] Roles on the backend: `admin`/`editor`/`viewer`, enforced via `require_role`
      on create/update/delete in `backend/src/backend/routers/employees.py`.
- [x] Employee grid: cards, initials-avatar fallback, brand-color bottom bar,
      skeleton loading state, empty state.
- [x] Server-side search (`?search=`), company filter (`?company=`),
      pagination (`?page=`/`?page_size=`), sort (`?sort=`) — debounced on
      the client (`useDebouncedValue`).
- [x] Details panel (view/add/edit modes), slide-in, brand-color accent,
      focus trap, confirm-delete flow.
- [x] Full CRUD wired end-to-end through React Query, cache invalidation
      on mutation, no full reloads.
- [x] Client + server validation (required fields, email format).
- [x] `/health` endpoint, Alembic migrations, seeded Postgres via Docker.

---

## Left to do

### Required deliverables (not stretch — graded directly)

- [ ] **Automated tests.** None exist yet (`backend/` has no `test_*.py`,
      `frontend/` has no `*.test.*`). Spec requires:
  - Backend: pytest covering CRUD endpoints, auth, validation (SQLite or
    disposable Postgres test DB).
  - Frontend: Vitest + React Testing Library for a few key components
    (card renders, form validates).
- [ ] **`docs/DESIGN.md`** — architecture diagram, component tree, API
      contract, DB schema, key decisions (incl. Postgres-vs-MySQL, where AI
      was used). `docs/` doesn't exist yet.
- [ ] **`docs/TEST_CASES.md`** — table of scenario/steps/expected/actual/
      pass-fail per module.

### Gaps vs. spec found while auditing

- [ ] **Role-based UI gating.** Backend already 403s a `viewer` on
      create/update/delete, but [EmployeeDetails.tsx](frontend/src/components/employee/EmployeeDetails.tsx#L107-L108)
      always renders Edit/Delete buttons regardless of role — a viewer sees
      controls that just fail when clicked. Hide them client-side based on
      the current user's role.
- [ ] **`/employees/:id` route** — spec's routing list expects it; `App.tsx`
      currently only has `/`, `/dashboard`, `/login`, `/signup`, `/terms`.
- [ ] **Drop `/terms`** — leftover from the take-home, out of scope per
      CLAUDE.md, still routed in `App.tsx`.

### Month-2 stretch goals (§8 — pick several, not all)

- [ ] Avatar/photo upload (file endpoint + storage, default-avatar fallback).
- [ ] Dark mode + design tokens.
- [ ] CI (GitHub Actions running pytest + vitest on push) — no `.github/workflows` yet.
- [ ] Full Dockerization — current `docker-compose.yml` only runs Postgres;
      API and web aren't containerized.
- [ ] AI bio feature (`POST /employees/{id}/bio`, env-gated on
      `ANTHROPIC_API_KEY`, "Generate with AI" action in the panel).
- [ ] Deploy (API+DB to Render/Railway/Fly.io, frontend to Vercel/Netlify),
      live URL in README.
- [ ] Observability & hardening — rate limiting on `/auth/login`, request
      logging, `.env.example` hygiene (already present, verify no secrets
      committed).

---

## Priority order

1. Tests + `docs/` — these are graded as required deliverables (15% + 10%
   of the rubric), not bonus, and are currently at zero.
2. Role-gated UI + `/employees/:id` route — small, closes a real
   functional gap in an otherwise-complete feature.
3. Pick 2–3 stretch items from §8 for the bonus (+10%). CI and Dockerizing
   the whole app are cheap wins if tests already exist; the AI bio feature
   is the most visible one against Figures 3/6 of the spec.
