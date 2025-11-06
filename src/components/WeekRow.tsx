import DayCell from "./DayCell";
import {Todo} from "../hooks/ToDo"


interface WeekRowProps {
  week: Date[];
  selectedKey: string;
  isExpanded: boolean;                 
  onSelectDay?: (date: Date) => void;
  todos: Todo[];
}

const WeekRow: React.FC<WeekRowProps> = ({ week, selectedKey, isExpanded, onSelectDay, todos }) => {
  return (
    <div className={`week-row ${isExpanded ? "expanded" : "compact"}`}>
      {week.map((day, i) => (
        <DayCell
          key={i}
          date={day}
          isExpanded={isExpanded}
          selectedKey={selectedKey}
          onSelectDay={onSelectDay}
          todos={todos}
      />
      ))}
    </div>
  );
};

export default WeekRow;
