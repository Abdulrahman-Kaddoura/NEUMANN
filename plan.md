# Neumann Frontend Plan

Scope: frontend only. Backend/API is assumed to exist and match the shapes
described here; nothing below depends on backend implementation details.

Stack locked in: React 19 + TS + Vite, React Router, TanStack Query, CSS
custom properties for theming, Mulish font (already wired).

---

## 0. Foundations (do before any feature work)

- [ ] Install `@tanstack/react-query`, set up `QueryClientProvider` in `main.tsx`.
- [ ] Add a typed API client in `src/api/client.ts` (thin `fetch` wrapper:
      base URL, JSON parsing, error normalization, attaches auth token).
- [ ] Define `src/types/employee.ts` and `src/types/auth.ts` — no `any`.
      Per the training spec's seed data (Appendix A) and mockups, `Employee`
      needs: `id` (read-only), `firstName`, `lastName`, `company`,
      `jobTitle`, `email` (optional), `address`, `city`, `county`,
      `brandColor` (hex string), `photoUrl` (optional — falls back to
      initials avatar), and optionally `bio` (Month 2 AI feature).
- [ ] Add CSS custom properties to `index.css` under `:root` for the base
      theme (spacing, radii, greys, shadow, breakpoints as comments). Brand
      color per employee will be set as an inline `style={{ '--brand': ... }}`
      on the card/panel, not hardcoded per component.
- [ ] Trim `App.tsx` routes down to `/login`, `/`, `/employees/:id` — drop
      `/signup`, `/terms`, `/forgot-password` (leftover from the requests
      take-home, out of scope here). Keep them only if you decide to build
      register later (Month 2).

---

## 1. Authentication (Month 1 slice: login + logout + route guard)

**Status: login page UI exists (`LoginPage.tsx`), needs wiring.**

- [ ] `useAuth` context/hook holding `{ token, user, login, logout }`,
      persisted to `localStorage`.
- [ ] `POST /login` via React Query `useMutation`. On success: store token,
      redirect to `/`. On failure: inline error message on the form (reuse
      `form.css` `.form-error` styling).
- [ ] `Logout` button (in `Navbar.tsx` — the header, not the sidebar; the
      sidebar is filter-only per the mockups) clears token + redirects
      to `/login`.
- [ ] `ProtectedRoute` wrapper component: no valid token → redirect to
      `/login`. Wrap `/` and `/employees/:id`.
- [ ] (Month 2, not now) Register screen + role field (`admin` / `viewer`)
      on the user object, used later to hide edit/delete controls for
      viewers.

---

## 2. Directory shell (layout only, no data yet)

Reuses `Navbar`, `Sidebar`, `Dashboard` wrapper already ported over and
already reshaped to match the mockups (§ Figures 2–6 of the training spec):

- [x] `Sidebar.tsx` trimmed to filter-only: a "Company" heading + checkbox
      list placeholder (no nav links, no logout — that lives in the header).
- [x] `Navbar.tsx` now holds: collapse/menu toggle, "NEUMANN" logo, search
      input, `+ Add` button, user name/role label, Logout link — matching
      Figure 3's header layout. The `+ Add` button and user label are
      static placeholders until auth (§1) and the panel (§4) exist.
- [ ] Rename/repurpose `Dashboard.tsx` as the directory page mounted at `/`.
- [ ] On mobile, header collapses to just the logo + menu toggle (hide
      search/+Add/user-label/logout behind the toggle or a secondary row);
      sidebar becomes an overlay behind that same toggle (Figure 5).
- [ ] Grid container: CSS Grid with `repeat(auto-fill, minmax(Npx, 1fr))`
      so cards-per-row scales with viewport width automatically — no JS
      breakpoint logic needed for the column count itself.
- [ ] Verify layout works from ~360px up to desktop with just the sidebar
      collapse behavior already built (`visible` state in `Dashboard.tsx`)
      extended to auto-collapse under a breakpoint on mount.

---

## 3. Employee data + card grid

- [ ] `useEmployees()` query hook (`GET /employees`) via React Query —
      handles loading/error/caching. No manual `useState` + `useEffect`
      fetch pattern.
- [ ] `EmployeeCard` component, per Figure 2/3: photo or initials-avatar
      fallback (derive initials from first/last name when no photo URL),
      full name, **job title** (own line, accent-colored per mockup),
      `company · city` line, bottom bar tinted via `--brand` CSS variable.
- [ ] Loading state: CSS skeleton cards (same grid, placeholder shapes,
      shimmer via CSS animation) shown while the query is loading; fade
      real cards in with a CSS transition once data resolves.
- [ ] Empty state: friendly message + illustration/icon when the filtered
      list is empty (distinct from "still loading").
- [ ] Search box (header): client-side filter by name/company/city against
      the already-fetched list — plain `useState` + `.filter()`, no need
      for React Query here since it's local, not server, filtering (Month 1).
- [ ] Company filter (sidebar): checkbox list derived from the unique set
      of companies in the fetched data. Selected companies narrow the
      grid. Animate add/remove with CSS (`transition` on opacity/transform,
      or a library-free FLIP if you want it smooth — start with a simple
      fade/scale transition, upgrade only if it looks bad).
- [ ] Selected-card highlight: track `selectedId` in state, apply a
      class/border style to the matching card.

---

## 4. Details panel (slide-in, shared by view/add/edit)

- [ ] `EmployeePanel` component, single implementation with a `mode` prop:
      `"view" | "add" | "edit"`.
- [ ] Positioning: `position: fixed` (mobile) / part of a flex layout that
      shrinks the grid (desktop), animated via `transform: translateX(...)`
      + `transition`, not width/display toggling — keeps it GPU-cheap and
      matches the "CSS transform, not a plugin" requirement.
- [ ] Desktop: panel pushes grid aside (grid container gets a
      `margin-right`/reduced width when panel is open). Mobile: panel
      overlays (fixed, full-height, over the grid with a backdrop).
- [ ] Panel accent bar/border uses the employee's `--brand` variable, same
      mechanism as the card.
- [ ] Focus management: on open, move focus into the panel (first focusable
      field or the close button); on close, return focus to the card/button
      that opened it. Trap focus while open (basic: `Escape` closes panel).
- [ ] `aria-modal`, `role="dialog"`/`"complementary"` as appropriate,
      `aria-labelledby` pointing at the panel heading.

---

## 5. View mode

- [ ] Read-only layout of the full employee record inside the panel, per
      Figure 3/6: avatar + name in the brand-colored header band, then a
      label/value list — Job title, Company, City, County, Email (em-dash
      if absent).
- [ ] "Edit" and "Delete" buttons (hidden entirely for `viewer` role once
      roles exist in Month 2; always visible for now).
- [ ] (Month 2, optional) Bio field with a "✨ Generate with AI" action that
      calls `POST /employees/{id}/bio`; only render the action if the
      backend reports the AI feature enabled (don't hardcode it on — the
      endpoint is env-gated and may not exist).

---

## 6. Add / Edit form (panel in form mode)

- [ ] Reuse `form.css` field styling (`.form-group`, `.form-input`,
      `.action-buttons`) already ported, restyled to fit the panel instead
      of a centered modal.
- [ ] Fields, in the order shown in Figure 4: Employee ID (read-only,
      edit mode only), First name, Last name, Company, Job title, Email,
      Brand color (color swatch input + hex text field kept in sync).
      City/county/address can ride along as additional fields even though
      the mockup's form only shows the subset above — match Figure 4
      exactly for the required set, add the rest below it.
- [ ] Edit mode pre-fills all fields from the selected employee; the ID
      field, if shown at all, is rendered read-only (disabled input or
      plain text, never editable).
- [ ] Client-side validation before submit:
  - required: first name, last name, company
  - email: valid format if non-empty
  - brand color: valid hex (`^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$`)
  - inline, field-level error text under each invalid field (no alert()).
- [ ] Submit via `useMutation` (`POST` for add, `PATCH`/`PUT` for edit).
      On success: invalidate/update the employees query cache so the grid
      reflects the change with no full reload; close the panel.
- [ ] Server-side validation errors (e.g. duplicate, server rejects hex)
      surface as the same inline field errors, not a generic alert.

---

## 7. Delete flow

- [ ] `ConfirmDelete.tsx` (already ported/generalized) wired with
      `itemLabel` = employee's name, `onConfirm` = delete mutation.
- [ ] On confirm: `useMutation` (`DELETE /employees/:id`), on success
      invalidate the employees query and remove the card from the grid,
      close both the confirm dialog and (if open) the details panel for
      that employee.

---

## 8. Polish pass (do last)

- [ ] Keyboard nav: tab order through header → sidebar → grid cards →
      panel; cards focusable and activatable with Enter/Space.
- [ ] Responsive check at 360px, 768px, 1024px, 1440px — grid columns,
      header collapse, sidebar toggle, panel overlay vs push.
- [ ] Remove any leftover request-take-home artifacts if more turn up.
- [ ] Sanity pass with `tsc --noEmit` and a manual click-through of all four
      CRUD operations end to end against the real backend once it exists.

---

## Explicitly out of scope for this pass (Month 2)

- Register screen, role-based (`admin`/`viewer`) permission gating.
- Server-side search/filtering (client-side is sufficient for Month 1).
