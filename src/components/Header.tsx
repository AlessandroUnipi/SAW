import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";
import LoginModal from "./Login";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const calendarHref = user ? `/Calendario/${user.uid}` : "/Calendario/ospite";

  const handleLogout = async () => {
    try {
      // chiudi overlay UI
      setIsMenuOpen(false);
      setOpenLogin(false);

      // evita “rincorsa” con l’effetto di CalendarioPage
      if (pathname.startsWith("/Calendario")) {
        navigate("/", { replace: true });
      }

      await logout(); // signOut + onAuthStateChanged
    } catch (err) {
      console.error("Logout Error:", err);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo" aria-label="Vai alla Home">
            <img src="/src/assets/Logo.jpeg" alt="" className="logo" />
          </Link>
        </div>

        <div className="header-buttons">
          {user ? (
            <>
              <span className="user">{user.email}</span>
              <button onClick={handleLogout} className="btn secondary">Logout →</button>
            </>
          ) : (
            <button onClick={() => setOpenLogin(true)} className="login-button">Accedi</button>
          )}

          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg className="menu-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)} />}

      {isMenuOpen && (
        <div className="menu-popup" ref={menuRef}>
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="menu-button-item">Home</Link>
          <Link to={calendarHref} onClick={() => setIsMenuOpen(false)} className="menu-button-item">Calendario</Link>
          {user ? (
            <button className="menu-button-item" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="menu-button-item" onClick={() => { setIsMenuOpen(false); setOpenLogin(true); }}>
              Accedi
            </button>
          )}
        </div>
      )}

      {openLogin && <LoginModal onClose={() => setOpenLogin(false)} />}
    </header>
  );
}
