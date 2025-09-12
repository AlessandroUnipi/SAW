import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Calendario from "./pages/Calendario";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* /Calendario senza id → reindirizza a /Calendario/ospite */}
        <Route path="/Calendario" element={<Navigate to="/Calendario/ospite" replace />} />

        {/* Calendario con parametro :id (uid o 'ospite') */}
        <Route path="/Calendario/:id" element={<Calendario key={window.location.pathname}/>} />

        {/* Fallback: qualunque altra rotta torna alla Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
