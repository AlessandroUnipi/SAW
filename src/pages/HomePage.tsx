import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/HomePage.css";

const HomePage = () => {
  const { user } = useAuth();          // se vuoi messaggi diversi log-in / guest
  const dest = user ? `/Calendario/${user.uid}`: "/Calendario/ospite"; 


  return (
    <main className="main-content">
      <h1>Benvenuto nella nostra piattaforma</h1>
      <p>Per accedere al Calendario premi il pulsante</p>

      <div className="navigation-buttons">
        {/* freccia sinistra */}
        <svg
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="freccia-sx"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499"
          />
        </svg>

        {/* link al calendario (route assoluta) */} 
        <Link to={dest}>
          <img
            src="/src/assets/Calendar.png"
            alt="Calendario"
            className="calendar-icon"
          />
        </Link>

        {/* freccia destra */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="freccia-dx"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499"
          />
        </svg>
      </div>

      {/* messaggio facoltativo per chi non è loggato */}
      {!user && (
        <p className="hint">
          Non hai un account? Premi “Accedi” in alto per registrarti.
        </p>
      )}
    </main>
  );
};

export default HomePage;
