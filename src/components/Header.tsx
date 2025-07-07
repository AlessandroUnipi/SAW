import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import './Header.css'; // Stili CSS per l'header
const Header =() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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
          <button className="register-button">Crea un account</button>
          <button className="login-button">Account personale →</button>
          
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