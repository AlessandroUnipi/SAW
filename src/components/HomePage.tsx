// src/components/Header.tsx
import {useEffect, useRef, useState } from "react";
import "./HomePage.css"; // Stili CSS standard

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAccount, setIsAccount] = useState(false);


  const colorBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const boxes = colorBoxRef.current?.querySelectorAll(".color-box");
      boxes?.forEach((box) => {
        box.addEventListener("mouseenter", () => {
          (box as HTMLElement).style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
        });
      });
    }, []);

  return (
  <>
    {/* Header con logo, pulsanti e menu mobile */}
    <header className="header">
      <div className="header-container">
        {/* Logo/Titolo */}
        <div className="logo-container">
          <img src="/src/assets/Logo.jpeg" alt="Logo" className="logo" />
        </div>
        
        {/* Menu di navigazione */}

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
          <div className="menu-popup">
            <button className="menu-button-item">Home</button>
            <button className="menu-button-item">Corsi</button>
            <button className="menu-button-item">Chi siamo</button>
            <button className="menu-button-item">Altro</button>
          </div>
      )}
    </header>

    {/* Body */}

    <main className="main-content">
      <h1>Benvenuto nella nostra piattaforma</h1>
      <section ref={colorBoxRef} className="color-box-section">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="color-box"></div>
        ))}
      </section>
    </main>
  </>
  );
};


export default HomePage;