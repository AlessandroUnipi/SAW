
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTodoFS } from "../hooks/useTodoFS";
import { useTodoLocal } from "../hooks/useTodoLocal";
import CalendarGrid from "../components/CalendarGrid";
import TodayDetails from "../components/TodayDetails";
import "../styles/Calendario.css";

export default function CalendarioPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    if (loading) return;

    const pathNow = location.pathname;
    const ownerPath = user ? `/Calendario/${user.uid}` : null;
    const guestPath = `/Calendario/ospite`;

    if (!id) {
      const target = ownerPath ?? guestPath;
      if (pathNow !== target) navigate(target, { replace: true });
      return;
    }

    if (user) {
      if (id !== user.uid && pathNow !== ownerPath) {
        navigate(ownerPath!, { replace: true });
      }
    } else {
      if (id !== "ospite" && pathNow !== guestPath) {
        navigate(guestPath, { replace: true });
      }
    }
  }, [id, user?.uid, loading, location.pathname, navigate]);

  if (loading || !id || (user && id !== user.uid) || (!user && id !== "ospite")) {
    return <div className="calendario-page">Caricamento...</div>;
  }

  const effectiveId = id;
  const isOwner = !!user && effectiveId === user.uid;

  const {
    todos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    getTodosByHour,
  } = isOwner
    ? useTodoFS(effectiveId, selectedDate)
    : useTodoLocal(effectiveId, selectedDate);

  return (
    <div className="calendario-page">
      {!isOwner && (
        <p className="guest-banner">
          Modalità ospite — i dati restano su questo dispositivo.
        </p>
      )}

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