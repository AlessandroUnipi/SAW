import WeekRow from "./WeekRow";
import "../styles/CalendarGrid.css";
import { startOfMonth, endOfMonth, startOfWeek, addDays, subMonths, addMonths} from "date-fns";
import { Todo, dayKeyOf } from "../hooks/ToDo";
import arrowLeft from "../assets/icons8-sinistra-squadrato-24.png";
import arrowRight from "../assets/icons8-destra-squadrato-24.png";


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

  const monthLabel = base.toLocaleString("it-IT", { month: "long", year: "numeric" });

  // costruisci settimane
  const weeks: Date[][] = [];
  for (let d = calendarStart; d <= monthEnd; d = addDays(d, 7)) {
    weeks.push(Array.from({ length: 7 }, (_, i) => addDays(d, i)));
  }

  const selectedKey = dayKeyOf(selectedDate);
  const selectedWeekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }).getTime();
  const prevMonth = () => onSelectDay?.(subMonths(base, 1));
  const nextMonth = () => onSelectDay?.(addMonths(base, 1));

  return (
    <>
      <div className="calendar-header">
        <button className="month-btn" onClick={prevMonth}>
          <img src={arrowLeft} alt="Mese precedente" />
        </button>

        <h2 className="month-label">{monthLabel}</h2>

        <button className="month-btn" onClick={nextMonth}>
          <img src={arrowRight} alt="Mese successivo" />
        </button>
      </div>

      <div className="calendar-grid">
        {weeks.map((week, i) => {
          const weekStartTs = startOfWeek(week[0], { weekStartsOn: 1 }).getTime();
          const isExpanded = weekStartTs === selectedWeekStart;   // settimana della data selezionata
          return (
            <WeekRow
              key={i}
              week={week}
              selectedKey={selectedKey}
              isExpanded={isExpanded}
              onSelectDay={onSelectDay}
              todos={todos}
            />
          );
        })}
      </div>
    </>
  );
}
