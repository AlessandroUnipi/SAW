import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import '../styles/Header.css'; // Stili CSS per l'header
import LoginModal from "./Login"
import { useAuth } from "../hooks/useAuth"




const Header =() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const {user, logout} = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      };

      if (isMenuOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <img src="/src/assets/Logo.jpeg" alt="Logo" className="logo" />
        </div>
        
        {/* Pulsanti */}
        <div className="header-buttons">
          {user ? (
            <>
              <span className="user">{user.email}</span>
              <button onClick={logout}>Logout →</button>
            </>
          ) : (
            <>
              <button onClick={() => setOpen(true)} className="login-button">Accedi</button>
            <button onClick={() => setOpen(true) } className="register-button">Crea account</button>
            </>
          )}
          {open && <LoginModal onClose={() => setOpen(false)}/>}
          
          {/* Menu mobile */}
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
   
      {/* Menu mobile dropdown */}
      {isMenuOpen && (
          <div className="menu-popup" ref={menuRef}>

            <Link to="/">
              <button className="menu-button-item">Home</button>
            </Link>

            <button className="menu-button-item">Chi siamo</button>

            <Link to="/calendario">
              <button className="menu-button-item">Calendario</button>
            </Link>
          </div>
      )}
    </header>
    );
}


export default Header;