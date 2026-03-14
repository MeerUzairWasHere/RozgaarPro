# RozgaarPro

RozgaarPro is a full-stack project with:
- `backend`: Node.js + TypeScript + Express + Prisma API
- `native`: Expo React Native mobile app

## Repository Structure

- `backend/` API server, Prisma schema, migrations
- `native/` Expo mobile application

## Prerequisites

- Node.js 18+
- npm
- PostgreSQL database (or Neon/Postgres-compatible connection)
- Expo CLI (optional, via `npx expo ...` is enough)

## Backend Setup

1. Go to backend:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create env file:

```bash
cp .env.example .env
```

4. Fill required values in `.env`.

5. Run Prisma migrations/generate client:

```bash
npm run migrate
npm run generate
```

6. Start backend:

```bash
npm run dev
```

Backend default URL: `http://localhost:3000`

## Native Setup

1. Go to native:

```bash
cd native
```

2. Install dependencies:

```bash
npm install
```

3. Create env file:

```bash
cp .env.example .env.local
```

4. Set `EXPO_PUBLIC_API_URL` in `.env.local`:
- Simulator: `http://localhost:3000/api/v1`
- Physical device: `http://<YOUR_LAN_IP>:3000/api/v1`

5. Start Expo app:

```bash
npm run start
```

## Useful Scripts

### Backend

- `npm run dev` build + start server
- `npm run build` compile TypeScript
- `npm run migrate` run Prisma migrations
- `npm run generate` generate Prisma client

### Native

- `npm run start` start Expo
- `npm run android` run Android app
- `npm run ios` run iOS app
- `npm run web` run web target

## Environment Files Added

- `backend/.env.example`
- `native/.env.example`

Use these templates and keep real secrets only in local env files.
