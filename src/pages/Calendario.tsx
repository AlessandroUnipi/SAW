import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTodoFS } from "../hooks/useTodoFS";
import { useTodoLocal } from "../hooks/useTodoLocal";
import CalendarGrid from "../components/CalendarGrid";
import TodayDetails from "../components/TodayDetails";
import "../styles/Calendario.css";

export default function CalendarioPage() {
  /* -------- recupero id rotta + utente loggato -------- */
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const isOwner = user?.uid === id;

  /* -------- hook dati (Firestore o LocalStorage) ------- */
  const {
    todos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    getTodosByHour,
  } = isOwner ? useTodoFS(id!) : useTodoLocal(id!);

  /* --------------------- UI ---------------------------- */
  return (
    <div className="calendario-page">
      {/* Banner ospite */}
      {!isOwner && (
        <p className="guest-banner">
          Modalità ospite &mdash; le modifiche saranno salvate solo su questo
          dispositivo.
        </p>
      )}

      <div className="calendar-main">
        {/* Colonna sinistra: dettagli di oggi */}
        <div className="container-left">
          <div className="calendar-giorno-corrente">
            <h2>Oggi</h2>
            <TodayDetails
              getTodosByHour={getTodosByHour}
              addTodo={addTodo}
              updateTodo={updateTodo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          </div>
        </div>

        {/* Colonna destra: griglia mese/settimana */}
        <div className="calendar-mese-corrente">
          <CalendarGrid
            todos={todos}
            addTodo={addTodo}
            updateTodo={updateTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}
