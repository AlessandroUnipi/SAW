// src/components/Header.tsx
import {useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css"; // Stili CSS standard


const HomePage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAccount, setIsAccount] = useState(false);


  return (
  <>


    <main className="main-content">
      <h1>Benvenuto nella nostra piattaforma</h1>
        <p>Per accedere al Calendario schiacciare il seguente pulsante</p>
        <div className="navigation-buttons">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="freccia-sx">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
          </svg>

          <Link to="/calendario">
              <img src="/src/assets/Calendar.png" alt="Calendario" className="calendar-icon" />
          </Link>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="freccia-dx">
            <path stroke-linecap="round" stroke-linejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
          </svg>

        </div>
    </main>
  </>
  );
};


export default HomePage;