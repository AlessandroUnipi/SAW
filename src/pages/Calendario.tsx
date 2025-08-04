import {useState} from "react";
import {useParams}  from "react-router"
import "../styles/Calendario.css"; // Stili CSS standard
import CalendarGrid from "../components/CalendarGrid";
import TodayDetails from "../components/TodayDetails";
import {db} from "../hooks/Todo"


const CalendarioPage = () => {
  const params = useParams();
  return (
    <div className="calendario-page">
      <div className = "calendar-main">
        <div className = "container-left">
        
          <div className = "calendar-giorno-corrente">
            <h2>Oggi</h2>
            <div className="today-details">
              <TodayDetails />
            </div>
          </div>
        </div>
        <div className="calendar-mese-corrente">
          <CalendarGrid />

        </div>
      
      </div>
      
    </div>
  );
};


export default CalendarioPage;