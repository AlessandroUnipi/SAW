import { useState } from "react";
import "../styles/Calendario.css"; // Stili CSS standard
import DayCell from "../components/DayCell"; // Importa il componente DayCell


// import { Navigate } from "react-router-dom";

const Calendario = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return(
        <>
            <h1 className="calendario-title">Calendario</h1>
            <h1>Sei dentro il Calendario</h1>
      <DayCell date={new Date()} oggi={true} />
        </>
    )
}


export default Calendario;