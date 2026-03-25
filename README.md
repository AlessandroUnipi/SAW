# SAW — Calendar PWA

Applicazione web installabile (PWA) per la gestione di attività giornaliere con calendario mensile, autenticazione utenti e notifiche push.

Progetto d'esame per il corso **Sviluppo di Applicazioni Web (SAW)** — Università di Pisa.

---

## Stack tecnologico

| Categoria | Tecnologia |
|-----------|-----------|
| UI | React 19, TypeScript |
| Build | Vite 6 |
| Stile | Tailwind CSS 4, CSS Modules |
| Routing | React Router 7 |
| Backend | Firebase (Auth, Firestore, FCM) |
| Offline | Service Worker manuale (cache-first) |
| Date | date-fns 4 |

---

## Funzionalità principali

- **Calendario mensile** con vista dettaglio giornaliera e lista ToDo
- **CRUD completo**: aggiunta, modifica, completamento, eliminazione attività
- **Autenticazione** via Email/Password e Google OAuth (Firebase Authentication)
- **Modalità ospite**: accesso senza account con persistenza in localStorage
- **Notifiche push**: inviate 10 minuti prima dell'orario del ToDo (Firebase Cloud Messaging)
- **Offline support**: asset pre-cachati, fallback da cache in assenza di rete
- **PWA installabile**: manifest + Service Worker, avviabile da home screen

---

## Installazione e avvio locale

### Prerequisiti

- Node.js >= 18
- npm

### Setup

```bash
# 1. Clona il repository
git clone https://github.com/AlessandroUnipi/SAW.git
cd SAW

# 2. Installa le dipendenze
npm install

# 3. Configura le variabili d'ambiente (vedi sezione sotto)
cp .env.example .env
# Compila .env con le credenziali Firebase

# 4. Avvia il server di sviluppo
npm run dev
```

### Altri comandi

```bash
npm run build    # Build di produzione (TypeScript + Vite)
npm run preview  # Anteprima della build locale
npm run lint     # Controllo ESLint
firebase deploy  # Deploy su Firebase Hosting
```

---

## Configurazione Firebase

Copia `.env.example` in `.env` e inserisci i valori dal tuo progetto Firebase:

```env
VITE_FB_API_KEY=
VITE_FB_AUTH_DOMAIN=
VITE_FB_PROJECT_ID=
VITE_FB_STORAGE_BUCKET=
VITE_FB_MESSAGING_SENDER_ID=
VITE_FB_APP_ID=
VITE_FB_MEASUREMENT_ID=
VITE_VAPID_KEY=
```

Dove trovare i valori:
- **Firebase config** → [Firebase Console](https://console.firebase.google.com) → Project Settings → Your apps
- **VAPID key** → Project Settings → Cloud Messaging → Web Push certificates

> **Nota sul Service Worker**: `public/firebase-messaging-sw.js` richiede la config Firebase hardcodata
> perché i Service Worker non accedono alle variabili Vite a runtime. Le credenziali Firebase web
> sono by design pubbliche; la sicurezza è garantita dalle Firebase Security Rules.

---

## Struttura del progetto

```
src/
├── components/        # Componenti UI (Header, CalendarGrid, DayCell, ...)
├── firebase/          # Inizializzazione SDK (firebaseConfig.ts, fcm.ts)
├── hooks/             # Custom hooks (useAuth, useTodoFS, useTodoLocal, useFcm, ...)
├── pages/             # Viste (HomePage, Calendario, FirestoreCalendario, LocalCalendario)
├── styles/            # Fogli di stile CSS
└── main.tsx           # Entry point + registrazione Service Worker

public/
├── firebase-messaging-sw.js   # Service Worker (FCM + cache-first)
├── manifest.webmanifest       # PWA manifest
└── icons/                     # Icone app
```

### Pattern architetturale chiave

Il layer dati è separato in base all'autenticazione:

| Utente | Dati | Implementazione |
|--------|------|-----------------|
| Autenticato | Cloud Firestore | `FirestoreCalendario.tsx` + `useTodoFS.ts` |
| Ospite | localStorage | `LocalCalendario.tsx` + `useTodoLocal.ts` |

`Calendario.tsx` funge da router e decide quale implementazione caricare in base al parametro `:id` (`"ospite"` o UID utente).

---

## Modello dati Firestore

```
/users/{userId}/todos/{todoId}
  text:        string     # descrizione attività
  completed:   boolean    # stato completamento
  dayKey:      string     # "YYYY-MM-DD"
  hour:        string     # "HH:MM"
  userId:      string     # UID proprietario
  notifyAt:    timestamp  # momento invio notifica
  createdAt:   timestamp
  updatedAt:   timestamp
```
