# Villa Reservation Test

Next.js 16 app for managing villas and reservations with Prisma and PostgreSQL.

## Stack

- Next.js 16
- React 19
- Prisma 7
- PostgreSQL
- Supabase
- Bun

## Features

- Create and list villas
- Create and list reservations
- Reservation overlap validation
- Prisma-backed server-side data access

## Environment

Copy `.env.example` to `.env` and fill in your real values.

Required variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
DATABASE_URL=
DIRECT_URL=
```

Notes:

- `DATABASE_URL` is the Prisma runtime connection.
- `DIRECT_URL` is preferred for Prisma migrations.
- Do not commit `.env`.

## Install

```bash
bun install
```

## Database setup

Validate the schema:

```bash
bunx prisma validate
```

Apply the committed migrations to PostgreSQL:

```bash
bunx prisma migrate deploy
```

For local development, create a new migration when the schema changes:

```bash
bunx prisma migrate dev --name your_change_name
```

If you need to reset the database in development:

```bash
bunx prisma migrate reset --force
```

## Run locally

```bash
bun dev
```

Open `http://localhost:3000`.

## Build

```bash
bun run build
```

## Project structure

```text
app/         Next.js app router pages
actions/     server actions
components/  form and UI components
lib/         shared runtime helpers
prisma/      Prisma schema
schemas/     Zod validation schemas
services/    Prisma-backed service layer
```

## Git notes

Ignored locally:

- `.env*` except `.env.example`
- `node_modules/`
- `.next/`
- `dev.db`
- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`

Before pushing:

1. Keep `.env` out of Git.
2. Commit `.env.example`.
3. Rotate any exposed database credentials.
