// src/components/DayCell.tsx
import { dayKeyOf } from "../hooks/ToDo";

interface DayCellProps {
  date: Date;
  isExpanded: boolean;
  selectedKey: string;
  onSelectDay?: (date: Date) => void;
}

const DayCell: React.FC<DayCellProps> = ({ date, isExpanded, selectedKey, onSelectDay }) => {
  const isSelected = dayKeyOf(date) === selectedKey;
  const isToday    = dayKeyOf(date) === dayKeyOf(new Date());

  return (
    <div
      className={`day-cell ${isExpanded ? "expanded" : ""} ${isSelected ? "selected" : ""} ${
        isToday ? "today" : ""
      }`}
      onClick={() => onSelectDay?.(date)}
    >
      <span className="day-number">{date.getDate()}</span>
    </div>
  );
};

export default DayCell;
