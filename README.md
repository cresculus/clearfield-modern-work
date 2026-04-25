# Clearfield — Modern Work consulting site

Single Next.js app with a **credit ledger** (SQLite + Prisma) and booking UI. Brand: **Clearfield** — Microsoft 365 / Modern Work consulting (advisory + hands-on delivery).

## Local setup

```bash
cp .env.example .env
npm install
npx prisma migrate dev
npm run dev
```

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

## Production notes

- **Database:** SQLite is fine for demos; use **Postgres** (Neon, Supabase, Railway, etc.) for real traffic. Set `DATABASE_URL` to the hosted URL and run `npx prisma migrate deploy` in CI or the host’s build step.
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
