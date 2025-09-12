import { useRef, useState, useEffect } from "react";
import { Todo, dayKeyOf } from "../hooks/ToDo";
import "../styles/TodayDetails.css";
import { useNotificationScheduler } from "../hooks/useNotificationScheduler";


type Props = {
  selectedDate: Date;
  getTodosByHour: (hour: number) => Todo[];
  addTodo: (hour: number, text: string) => void;
  updateTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function TodayDetails({
  selectedDate,
  getTodosByHour,
  addTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
}: Props) {
  const [editingHour, setEditingHour] = useState<number | null>(null);
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const selectedKey = dayKeyOf(selectedDate);

  // quando cambio giorno, esco dall'editing
  useEffect(() => {
    setEditingHour(null);
  }, [selectedKey]);

  const startEdit = (hour: number) => {
    setEditingHour(hour);
    requestAnimationFrame(() => inputRefs.current[hour]?.focus());
  };

  const handleKeyUp = (hour: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    const text = (el.value || "").trim();
    const existing = getTodosByHour(hour)[0]; 

    if (e.key === "Enter") {
      if (!text) {
        return;
      } else if (existing) {
        updateTodo({ ...existing, text });
      } else {
        addTodo(hour, text);
      }
      setEditingHour(null);
      el.blur();
      return;
    }

    if (e.key === "Escape") {
      el.value = existing?.text ?? "";
      setEditingHour(null);
      el.blur();
    }
  };

  const todosForDay = Array.from({ length: 24 }, (_, h) => getTodosByHour(h)[0])
  .filter((todo): todo is Todo => !!todo); 

  useNotificationScheduler(todosForDay, selectedDate);


  return (
    <div className="today-details">
      <div className="hours" key={selectedKey /* rimonta tutte le righe al cambio giorno */}>
        {Array.from({ length: 24 }, (_, h) => {
          const todo = getTodosByHour(h)[0];
          const hasTodo = !!todo;

          return (
            <div
              key={h}
              className={`hour-row ${hasTodo ? "has-todo" : ""} ${todo?.completed ? "is-completed" : ""}`}
            >
              {/* Ora */}
              <span className="hour">{pad(h)}:00</span>

              {/* Checkbox: nel DOM sempre, ma il CSS la nasconde se non c'è todo */}
              <input
                type="checkbox"
                checked={!!todo && todo.completed}
                onChange={() => todo && toggleTodo(todo.id)}
                aria-label="Completa"
              />

              {/* Input: key forza il remount quando cambia giorno/ora/todo */}
              <input
                key={`${selectedKey}-${todo?.id ?? "none"}-${h}`}
                ref={(el) => { inputRefs.current[h] = el; }}
                className="text-input"
                placeholder="clicca per aggiungere"
                defaultValue={todo?.text ?? ""}
                onFocus={() => startEdit(h)}
                onKeyUp={(e) => handleKeyUp(h, e)}
              />

              {/* Delete: solo se esiste il todo */}
              {todo && (
                <button
                  className="todo-delete"
                  onClick={() => {
                    deleteTodo(todo.id);
                    const el = inputRefs.current[h];
                    if (el) el.value = ""; // svuota subito il campo
                    setEditingHour(null);
                  }}
                  aria-label="Elimina"
                  title="Elimina"
                >
                  &times;
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
