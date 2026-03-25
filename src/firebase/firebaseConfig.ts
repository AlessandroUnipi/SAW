import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configurazione del progetto (valori letti da .env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY as string,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FB_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FB_APP_ID as string,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID as string,
};

// Inizializza Firebase app
const app = initializeApp(firebaseConfig);

// Inizializza Firestore con cache persistente (supporto multi-tab)
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

// Inizializza Auth
const auth = getAuth(app);

export { db, auth, app };
