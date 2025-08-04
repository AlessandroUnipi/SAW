import React from "react";
import WeekRow from "./WeekRow";
import '../styles/CalendarGrid.css'; // Importa gli stili CSS per il CalendarGrid
import  { startOfMonth, endOfMonth, startOfWeek, addDays, isSameMonth } from 'date-fns';

const CalendarGrid = () => {
    const oggi = new Date();
    const monthStart = startOfMonth(oggi);
    const monthEnd = endOfMonth(monthStart);
    const daysOfWeek = ["LUN", "MAR", "MER", "GIO", "VEN", "SAB", "DOM"];

    // Calcolo dell'inizio della settimana del primo giorno del mese
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // settimana che inizia lunedì


    const weeks = [];
    let currentDate = calendarStart;
    
    while (currentDate <= monthEnd) {
        const week = Array.from({ length: 7 }, (_, i) => {
        const date = addDays(currentDate, i);
        return date;
        });

        weeks.push(week);
        currentDate = addDays(currentDate, 7);
    }   

    return (
        <>
            <div className="calendar-header">
                <h2>Calendario di {oggi.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <div className="days-of-week">
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className="day-header">{day}</div>
                    ))}
                </div>
            </div>
            <div className="calendar-grid">
                {weeks.map((week, index) => (
                    <WeekRow key={index} week={week} currentDate={oggi} />
                ))}
            </div>
        </>
    );
};

export default CalendarGrid;
