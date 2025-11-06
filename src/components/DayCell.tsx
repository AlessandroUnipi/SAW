import { useRef, useEffect, useState } from "react";
import { Todo, dayKeyOf } from "../hooks/ToDo";

interface DayCellProps {
  date: Date;
  isExpanded: boolean;
  selectedKey: string;
  onSelectDay?: (date: Date) => void;
  todos: Todo[];
}

const DayCell: React.FC<DayCellProps> = ({
  date,
  isExpanded,
  selectedKey,
  onSelectDay,
  todos,
}) => {
  const dayKey = dayKeyOf(date);
  const isSelected = dayKey === selectedKey;
  const isToday = dayKey === dayKeyOf(new Date());
  const dayTodos = todos.filter((t) => t.dayKey === dayKey);

  const bottomRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    if (bottomRef.current) {
      const { scrollHeight, clientHeight } = bottomRef.current;
      setHasOverflow(scrollHeight > clientHeight);
    }
  }, [dayTodos]);

  return (
    <div
      className={`day-cell-wrapper ${isExpanded ? "expanded" : ""} ${
        isSelected ? "selected" : ""
      } ${isToday ? "today" : ""}`}
      onClick={() => onSelectDay?.(date)}
    >
      {/* Parte superiore: numero e pallino */}
      <div className="day-top">
        <span className="day-number">{date.getDate()}</span>
        {dayTodos.length > 0 && <span className="todo-dot"></span>}
      </div>

      {/* Parte inferiore con i ToDo */}
      {(isSelected || isExpanded) && dayTodos.length > 0 && (
        <div
          ref={bottomRef}
          className={`day-bottom ${hasOverflow ? "has-overflow" : ""}`}
        >
          <ul className="day-todo-list">
            {dayTodos.slice(0, 5).map((todo) => (
              <li key={todo.id} className="day-todo-item">
                • {todo.text}
              </li>
            ))}
            {dayTodos.length > 5 && (
              <li className="day-todo-more">
                +{dayTodos.length - 5} altri
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DayCell;
