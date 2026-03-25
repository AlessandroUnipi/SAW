# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # TypeScript compile + Vite production build
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

Deployment is via Firebase Hosting (`firebase deploy`). No automated tests exist in this project.

## Environment Setup

Requires a `.env` file (or `.env.local`) with Firebase credentials:

```
VITE_FB_API_KEY=
VITE_FB_AUTH_DOMAIN=
VITE_FB_PROJECT_ID=
VITE_FB_STORAGE_BUCKET=
VITE_FB_MESSAGING_SENDER_ID=
VITE_FB_APP_ID=
VITE_VAPID_KEY=   # Required for FCM push notifications
```

## Architecture

This is a React 18 + TypeScript PWA built with Vite, using Firebase as the backend.

### Dual-mode data layer

The key architectural pattern is that authenticated users and guests use entirely separate data implementations:

- **Authenticated users** → `FirestoreCalendario.tsx` + `useTodoFS.ts` (Cloud Firestore)
- **Guest users** → `LocalCalendario.tsx` + `useTodoLocal.ts` (localStorage)

`Calendario.tsx` is the router that decides which to render based on route param (`/Calendario/:id` — `:id` is the user's UID for authenticated users, `"ospite"` for guests).

### Auth flow

`src/hooks/useAuth.tsx` is a React context providing Firebase auth state. `src/main.tsx` wraps the entire app in `AuthProvider`. Auth UI is in `src/components/Login.tsx` (modal, supports email/password and Google OAuth).

### Push notifications

`useFcm.ts` manages FCM token registration. `useNotificationScheduler.ts` schedules `setTimeout`-based notifications 10 minutes before a todo's hour. The Service Worker (`public/firebase-messaging-sw.js`) handles background messages and implements a cache-first strategy for offline support.

### Firestore data model

```
/users/{userId}/todos/{todoId}
  - text: string
  - completed: boolean
  - dayKey: string       # "YYYY-MM-DD"
  - hour: string         # "HH:MM"
  - userId: string
  - notifyAt: timestamp
  - createdAt: timestamp
  - updatedAt: timestamp
```

### Key files

| File | Purpose |
|------|---------|
| `src/App.tsx` | React Router setup |
| `src/pages/Calendario.tsx` | Auth/guest routing split |
| `src/hooks/useAuth.tsx` | Firebase auth context |
| `src/hooks/useTodoFS.ts` | Firestore CRUD |
| `src/hooks/useTodoLocal.ts` | localStorage CRUD |
| `src/firebase/firebaseConfig.ts` | Firebase SDK initialization |
| `public/firebase-messaging-sw.js` | Service Worker (FCM + cache) |
