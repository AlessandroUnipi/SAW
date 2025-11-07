import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";
import LoginModal from "./Login";
import { useAuth } from "../hooks/useAuth";
import { useFcm } from "../hooks/useFcm";
const VAPID = import.meta.env.VITE_VAPID_KEY as string;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [isVisible, setIsVisible] = useState(false); 
  const [installPrompt, setInstallPrompt] = useState <BeforeInstallPromptEvent  | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { token, permission, enable, disable } = useFcm(VAPID);
  const [display, setDisplay] = useState <"browser" | "standalone">("browser");


  const calendarHref = user ? `/Calendario/${user.uid}` : "/Calendario/ospite";

  const handleLogout = async () => {
    try {
      // chiudi overlay UI
      setIsMenuOpen(false);
      setOpenLogin(false);

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
  const checkMode = () => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setDisplay("standalone");
    } else {
      setDisplay("browser");
    }
  };

    checkMode();
    const mq = window.matchMedia("(display-mode: standalone)");
    mq.addEventListener("change", checkMode);

    return () => mq.removeEventListener("change", checkMode);
  }, []);

  useEffect(()=> {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if(!installPrompt)return;

    installPrompt.prompt();

    const {outcome} = await installPrompt.userChoice;

    if(outcome === "accepted"){
      console.log("installazione Accettata");
    }else{
      console.log("Installazione Rifiutata")
    }

    setInstallPrompt(null);
    setIsVisible(false);
  }

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
            <img src="/src/assets/Calendar.png" alt="" className="logo" />
          </Link>
        </div>


        <div className="header-buttons">

        {display === "browser" && (
          <>
            {isVisible && (
              <button onClick={handleInstall} className="install-btn">
                Installa
              </button>
            )}

            {!isVisible && (
              <button
                onClick={() => window.location.href = "web+calendar://open"}
                className="open-app-btn"
              >
                Apri in App
              </button>
            )}
          </>
        )}{user ? (
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
          {user && (
            <button
              className="btn secondary"
              onClick={() => (token ? disable() : enable())}
              title={permission !== "granted" ? "Richiede permesso" : ""}
            >
              {token ? "Disattiva notifiche" : "Attiva notifiche"}
            </button>
          )}
        </div>
      )}

      {openLogin && <LoginModal onClose={() => setOpenLogin(false)} />}
    </header>
  );
}
