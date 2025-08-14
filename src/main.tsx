import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom/client";
import './styles/index.css'
import App from './App.tsx'
import { AuthProvider } from "./hooks/useAuth";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)