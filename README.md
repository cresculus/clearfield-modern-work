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
5. **Build-time DB:** On that `DATABASE_URL` variable, enable **“Available at build time”** (or Railway’s equivalent) so `prisma migrate deploy` can run during the image build. If the build cannot reach the DB, set the Railway build command to run migrations at **deploy start** instead (see below).
6. **Root directory:** If the repo is not only this app, set **Root Directory** in the service settings to `clearfield-modern-work` (or wherever this `package.json` lives).
7. **Build / start:** This repo includes `railway.toml`. The build runs `npm install` (which runs `postinstall` → `prisma generate`) then `npm run build` → `prisma migrate deploy && next build`. Start is `npm run start` (Next listens on **`PORT`** — Railway sets this automatically).

**Optional:** If migrations must run only when the container starts (not during build), change the service **Build Command** to `npm run build:next` and add a script that runs `prisma migrate deploy` before `next start` (e.g. a small `scripts/start.sh`). Most Railway + Prisma setups keep `migrate deploy` in the build step with `DATABASE_URL` available at build time.

After deploy, open the generated **`.up.railway.app`** URL and test **Book**.

## Production notes

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

## License

Private project — you own the code.
