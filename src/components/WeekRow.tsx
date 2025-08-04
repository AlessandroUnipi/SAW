import DayCell from './DayCell';
import React from 'react';
import '../styles/WeekRow.css'; // Importa gli stili CSS per il WeekRow

interface WeekRowProps {
  week: Date[];
  currentDate: Date;
}


const WeekRow: React.FC<WeekRowProps> = ({ week, currentDate }) => {
  
  //Rileva la settimana corrente
  const isCurrentWeek = week.some(day =>
    day.getDate() === currentDate.getDate() &&
    day.getMonth() === currentDate.getMonth() &&
    day.getFullYear() === currentDate.getFullYear()
  );

  return (
    <div className="week-row">
      {week.map((day, index) => (
        <DayCell 
          key={index}
          date={day}
          oggi={day.getDate() === currentDate.getDate() && 
                day.getMonth() === currentDate.getMonth() && 
                day.getFullYear() === currentDate.getFullYear()}
          isExpanded={isCurrentWeek} 
        />
      ))}
    </div>
  );
};


export default WeekRow;

