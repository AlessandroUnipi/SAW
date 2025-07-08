import { useState } from "react";
import "../styles/Calendario.css"; // Stili CSS standard
import CalendarGrid from "../components/CalendarGrid";


const CalendarioPage = () => {
  return (
    <div className="calendario-page">
      <h1>Il tuo Calendario</h1>
      <CalendarGrid />
    </div>
  );
};


export default CalendarioPage;