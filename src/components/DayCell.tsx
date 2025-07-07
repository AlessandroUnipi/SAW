import React from "react";
import '../styles/DayCell.css'; // Importa gli stili CSS per il DayCell

interface DayCellProps {
    date: Date;
    oggi: boolean;
}

const DayCell: React.FC<DayCellProps> = ({ date, oggi }) => {
  return (
    <div className={`day-cell ${oggi ? 'today' : ''}`}>
      <span>{date.getDate()}</span>
    </div>
  );
};

export default DayCell;
