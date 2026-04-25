# Clearfield — Modern Work consulting site

Single Next.js app with a **credit ledger** (PostgreSQL + Prisma) and booking UI. Brand: **Clearfield** — Microsoft 365 / Modern Work consulting (advisory + hands-on delivery).

## Local setup

**Database:** Postgres (matches production / Railway). With Docker:

```bash
docker compose up -d
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev
```

Without Docker, point `DATABASE_URL` at any Postgres instance (Neon, Supabase, local install), then `npx prisma migrate dev`.

To run `next build` **without** a running database (UI-only check): `npm run build:next`. Production/Railway should always use `npm run build` so migrations apply.

Open [http://localhost:3000](http://localhost:3000) and use **Book** to:

1. Enter a work email → a **Client** row is created with **one welcome credit** and a ledger entry.
2. Pick a slot → a **Booking** row is created and one credit is debited.
3. When credits hit zero, use the dev purchase API (or wire Stripe later).

## Consultant credit packs (development)

Set `DEV_PURCHASE_SECRET` in `.env`. Then:

```bash
curl -X POST http://localhost:3000/api/credits/purchase-dev ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"you@company.com\",\"pack\":\"bench\",\"secret\":\"YOUR_DEV_PURCHASE_SECRET\"}"
```

Packs: `starter` (3), `bench` (8), `field` (20) credits. Replace with Stripe Checkout + webhooks for production.

## Push to GitHub

```bash
cd clearfield-modern-work
git add -A
git commit -m "Initial Clearfield consulting site with credits and booking"
gh repo create clearfield-modern-work --public --source=. --remote=origin --push
```

This workspace was pushed to: `https://github.com/cresculus/clearfield-modern-work` (the GitHub CLI account on this machine). To use your own account instead, create an empty repo in the GitHub UI, then:

```bash
git remote set-url origin https://github.com/YOUR_USER/clearfield-modern-work.git
git push -u origin master
```

## Deploy on Railway

1. **Repo:** Push this project to GitHub (or connect the folder with Railway CLI).
2. **New project → Deploy from GitHub** → pick the repo.
3. **Add Postgres:** In the project canvas, **New** → **Database** → **PostgreSQL**. Railway creates `DATABASE_URL` on the plugin.
4. **Link DB to the app:** On your **Next.js service** → **Variables** → **Add variable** → **Add reference** → choose the Postgres service → `DATABASE_URL` (same name). This must exist on the **web service** so runtime and builds see it.
5. **Build-time DB:** Not required with current scripts. Build does **not** run migrations. Migrations run at service start (`npm run start`) inside Railway private networking.
6. **Root directory:** If the repo is not only this app, set **Root Directory** in the service settings to `clearfield-modern-work` (or wherever this `package.json` lives).
7. **Build / start:** The build runs `npm install` (`postinstall` → `prisma generate`) then `npm run build` → `next build`. **`npm run start`** runs **`prisma migrate deploy && next start`** so migrations happen at container startup where Railway can reach Postgres. `prisma` is a runtime dependency for that reason. Next listens on **`PORT`** (Railway sets it).

This repo now uses start-time migrations by default to avoid build-network DB failures on Railway.

After deploy, open the generated **`.up.railway.app`** URL and test **Book**.

### Railway: `DATABASE_URL` missing or logs show `sqlite`

1. **Variable on the web service:** Open the **clearfield-modern-work** service (not only the Postgres plugin) → **Variables**. You must see **`DATABASE_URL`** there, usually as a reference: `${{Postgres.DATABASE_URL}}`. If it only exists on Postgres, the app container never receives it—add it with **Add variable → Variable reference**.
2. **Redeploy:** After adding or changing variables, trigger a **new deployment** (Redeploy). Env changes do not always apply to already-running containers.
3. **Old build:** If Prisma errors mention **`provider = "sqlite"`**, Railway is still running an **old image** from before the repo switched to PostgreSQL. Confirm the deployment’s **Git commit** matches your latest `master`, then redeploy. **Watchdog:** Settings → clear stale build cache if Railway offers it, or push an empty commit to force a rebuild.
4. **Start-time migrations:** Ensure `DATABASE_URL` is present on the web service so `npm run start` can run `prisma migrate deploy` before Next starts.

## Production notes

- **Prisma model:** The table is still named `Client` in Postgres; the Prisma model is **`BookingAccount`** (`@@map("Client")`) to avoid clashing with `PrismaClient` in some bundlers.
- **Database:** PostgreSQL (Railway plugin or any host). `DATABASE_URL` must match Prisma’s `postgresql://…` format.
- **Payments:** Replace `/api/credits/purchase-dev` with Stripe Checkout; on `checkout.session.completed`, insert positive `CreditLedger` rows and increment `creditBalance`.
- **Calendar:** This MVP does not send calendar invites automatically—hook Microsoft Graph, Cal.com, or Calendly after checkout if you want native invites.

## API summary

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/client` | `{ "email" }` — create client + welcome credit, or return balance + bookings |
| `GET` | `/api/slots` | Next available ET business-hour slots (45 min) not yet booked |
| `POST` | `/api/book` | `{ "email", "startsAt" }` — book if credits ≥ 1 |
| `POST` | `/api/credits/purchase-dev` | `{ "email", "pack", "secret" }` — add credits (dev / manual) |
| `GET` | `/api/health` | DB connectivity check (`{ "ok": true }` or JSON error + `code`) |

## License

Private project — you own the code.
