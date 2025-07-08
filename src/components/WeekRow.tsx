import DayCell from './DayCell';
import React from 'react';
import '../styles/WeekRow.css'; // Importa gli stili CSS per il WeekRow

interface WeekRowProps {
  week: Date[];
  currentDate: Date;
}

const WeekRow: React.FC<WeekRowProps> = ({ week, currentDate }) => {
  return (
    <div className="week-row">
      {week.map((date, index) => (
        <DayCell
          key={index}
          date={date}
          oggi={
            date.getDate() === currentDate.getDate() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear()
          }
        />
      ))}
    </div>
  );
};

export default WeekRow;
