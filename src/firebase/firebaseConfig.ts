import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configurazione del progetto
const firebaseConfig = {
  apiKey: "AIzaSyCLcvLHmV_7etltYH17qOx0wGqIqIzHsCg",
  authDomain: "saw2025-bde46.firebaseapp.com",
  projectId: "saw2025-bde46",
  storageBucket: "saw2025-bde46.firebasestorage.app",
  messagingSenderId: "921166745406",
  appId: "1:921166745406:web:afc07bfb62f1a56669666f",
  measurementId: "G-17MN2ZMX1X"
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
