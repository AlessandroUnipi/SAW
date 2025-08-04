import React from "react";
import '../styles/DayCell.css'; // Importa gli stili CSS per il DayCell

interface DayCellProps {
    date: Date;
    oggi: boolean;
    isExpanded: boolean;
}

const DayCell: React.FC<DayCellProps> = ({ date, oggi, isExpanded }) => {
  if(isExpanded) {
    return(
      <div className = {`day-cell expanded ${oggi ? 'today' : ''}`}>
        <div className="day-date">
          {date.toLocaleDateString("it-IT", {day: 'numeric' })}
        </div>
        <ul className="day-todo">
          <li>To Do 1</li>
          <li>To Do 2</li>
        </ul>
      </div>
        
    );
  }else{
    return (
      <div className={`day-cell ${oggi ? 'today' : ''}`}>
        <span>{date.getDate()}</span>
      </div>
    );}
  
};

export default DayCell;
