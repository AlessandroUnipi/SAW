import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTodoFS } from "../hooks/useTodoFS";
import { useTodoLocal } from "../hooks/useTodoLocal";
import CalendarGrid from "../components/CalendarGrid";
import TodayDetails from "../components/TodayDetails";
import "../styles/Calendario.css";

export default function CalendarioPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading} = useAuth();
  const navigate = useNavigate();
  const isOwner = user?.uid === id;

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());


  useEffect(() => {
    if (!id || loading) return;
                  
    // Se ora sono loggato e l'URL è "ospite" (o un altro id), portami al mio uid
    if (user && id !== user.uid) {
      navigate(`/Calendario/${user.uid}`, { replace: true });
      return;
    }

    // Se non sono loggato e sto guardando un uid, torna alla modalità ospite
    if (!user && id !== "ospite") {
      navigate(`/Calendario/ospite`, { replace: true });
    }
  }, [id, user?.uid, loading, navigate]);

  /* -------- hook dati (Firestore o LocalStorage) ------- */
  const {
    todos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    getTodosByHour,
  } = isOwner ? useTodoFS(id!, selectedDate) : useTodoLocal(id!, selectedDate);

  return (
    <div className="calendario-page">

      {!isOwner && (
        <p className="guest-banner">
          Modalità ospite — i dati restano su questo dispositivo.
        </p>
      )}

      <div className="calendar-main">

        {/* Colonna sinistra: dettagli di oggi */}
        <div className="container-left">
          <div className="calendar-giorno-corrente">

            <h2>{selectedDate.toLocaleDateString("it-IT", {
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

        {/* Colonna destra: griglia mese/settimana */}
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
