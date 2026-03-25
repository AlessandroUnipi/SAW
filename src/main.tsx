import { createRoot } from 'react-dom/client'
import React from "react";
import './styles/index.css'
import App from './App.tsx'
import { AuthProvider } from "./hooks/useAuth";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .catch((error) => {
      console.error("[FCM] Registrazione SW fallita:", error);
    });
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
) 