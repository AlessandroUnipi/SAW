import { useState } from "react";
import "./PaginaCorsi.css"; // Stili CSS standard


// import { Navigate } from "react-router-dom";

const PaginaCorsi = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return(
        <header className="header">
            <div className="header-container">
                {/* Logo/Titolo */}
                <div className="logo-container">
                    <img src="/src/assets/Logo.jpeg" alt="Logo" className="logo" />
                </div>

                {/* Pulsanti */}
                <div className="header-buttons">
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

            {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <div className="menu-section">
              <h3>Menu</h3>
              <div className="menu-item">
                <div>Maria</div>
                <div className="subtext">Battista: corrispettiva, grazie a chiavi</div>
              </div>
            </div>
          </div>
        </div>
      )}
        </header>
    )
}


export default PaginaCorsi;