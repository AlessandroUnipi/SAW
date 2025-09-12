import WeekRow from "./WeekRow";
import "../styles/CalendarGrid.css";
import { startOfMonth, endOfMonth, startOfWeek, addDays } from "date-fns";
import { Todo, dayKeyOf } from "../hooks/ToDo";

interface Props {
  todos: Todo[];                 
  selectedDate: Date;            
  onSelectDay?: (d: Date) => void;
}

export default function CalendarGrid({ todos, selectedDate, onSelectDay }: Props) {
  // base = mese della data selezionata
  const base = selectedDate ?? new Date();

  const monthStart = startOfMonth(base);
  const monthEnd   = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });

  const daysOfWeek = ["LUN", "MAR", "MER", "GIO", "VEN", "SAB", "DOM"];
  const monthLabel = base.toLocaleString("it-IT", { month: "long", year: "numeric" });

  // costruisci settimane
  const weeks: Date[][] = [];
  for (let d = calendarStart; d <= monthEnd; d = addDays(d, 7)) {
    weeks.push(Array.from({ length: 7 }, (_, i) => addDays(d, i)));
  }

  const selectedKey = dayKeyOf(selectedDate);
  const selectedWeekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }).getTime();

  return (
    <>
      <div className="calendar-header">
        <h2>{monthLabel}</h2>
        <div className="days-of-week">
          {daysOfWeek.map((d, i) => (
            <div key={i} className="day-header">{d}</div>
          ))}
        </div>
      </div>

      <div className="calendar-grid">
        {weeks.map((week, i) => {
          const weekStartTs = startOfWeek(week[0], { weekStartsOn: 1 }).getTime();
          const isExpanded = weekStartTs === selectedWeekStart;   // 👈 settimana della data selezionata
          return (
            <WeekRow
              key={i}
              week={week}
              selectedKey={selectedKey}
              isExpanded={isExpanded}
              onSelectDay={onSelectDay}
            />
          );
        })}
      </div>
    </>
  );
}
