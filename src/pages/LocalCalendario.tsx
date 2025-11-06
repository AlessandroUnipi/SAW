import { useState } from "react";
import { useTodoLocal } from "../hooks/useTodoLocal";
import CalendarGrid from "../components/CalendarGrid";
import TodayDetails from "../components/TodayDetails";
import "../styles/Calendario.css";

interface LocalCalendarioProps {
  id: string;
}

export function LocalCalendario({ id }: LocalCalendarioProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const {
    todos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    getTodosByHour,
  } = useTodoLocal(id, selectedDate);

  return (
    <div className="calendario-page">
      <div className="calendar-main">
        <div className="container-left">
          <div className="calendar-giorno-corrente">
            <h2>
              {selectedDate.toLocaleDateString("it-IT", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h2>

            <TodayDetails
              selectedDate={selectedDate}
              getTodosByHour={getTodosByHour}
              addTodo={addTodo}
              updateTodo={updateTodo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          </div>
        </div>

        <div className="calendar-mese-corrente">
          <CalendarGrid
            todos={todos}
            selectedDate={selectedDate}
            onSelectDay={setSelectedDate}
          />
        </div>
      </div>
    </div>
  );
}
