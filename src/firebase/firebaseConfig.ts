/*  firebaseConfig.ts
 *  -----------------
 *  • Inizializza UNA sola istanza Firebase App
 *  • Esporta auth e Firestore come singleton
 *  • Abilita la cache offline (IndexedDB) – può essere tolta lato SSR
 *  • Tutte le chiavi sono lette da variabili d’ambiente
 *    (prefisso VITE_ se usi Vite; REACT_APP_ per CRA; NEXT_PUBLIC_ per Next.js)
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  enableIndexedDbPersistence,
  initializeFirestore,
} from "firebase/firestore";


const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FB_API_KEY,
  authDomain:        import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FB_APP_ID,
  /* measurementId facoltativo */
};

/* ---------- Inizializzazione ---------- */
export const app  = initializeApp(firebaseConfig);

/* singole istanze condivise in tutta l’app */
export const auth = getAuth(app);

/* possiamo usare initializeFirestore per opzioni extra */
export const db   = initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});

/* Cache offline / sync quando torna la connessione */
enableIndexedDbPersistence(db).catch((err) => {
  // Si scatena se due tab tentano la persistenza insieme
  console.warn("Firestore offline persistence non abilitata:", err.code);
});
