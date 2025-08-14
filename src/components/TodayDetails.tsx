import React, { useState } from "react";
import "../styles/TodayDetails.css";
// 👉 importa esplicitamente il tipo Todo (assicurati che sia esportato dal file hooks/ToDo.ts)
import type { Todo } from "../hooks/ToDo";

interface Props {
  getTodosByHour: (hour: number) => Todo[];
  addTodo:    (hour: number, text: string) => void;
  updateTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export default function TodayDetails ({getTodosByHour, addTodo, updateTodo, toggleTodo, deleteTodo}: Props)  {

  const [editingHour, setEditingHour] = useState<number | null>(null); // serve a capire su quale riga siamo (ci dice l'ora)
  const [editingText, setEditingText] = useState<string>(""); // serve a mantenere il testo digitato nell'input mentre l'utente scrive

  
  const startEdit = (hour: number, currentText: string) => {
    setEditingHour(hour);
    setEditingText(currentText);
  };

  const stopEdit = () => {
    setEditingHour(null);
    setEditingText("");
  };

  /*Gestisce Enter/Escape durante la creazione o modifica in-line.*/
  const handleKeyUp = (
    hour: number,
    todo: Todo | undefined,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && editingText.trim()) {
      if (todo) {
        // modifica esistente
        updateTodo({ ...todo, text: editingText.trim() });
      } else {
        // creazione
        addTodo(hour, editingText.trim());
      }
      stopEdit();
    }

    if (e.key === "Escape") {
      stopEdit();
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="today-details">
      <h3>
        {new Date().toLocaleDateString("it-IT", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </h3>

      {hours.map((hour) => {
        const todo = getTodosByHour(hour)[0]; // 0-1 todo per ora
        const isEditing = editingHour === hour;

        return (
          <div key={hour} className="hour-row">
            {/* Ora */}
            <span className="hour-label">
              {hour.toString().padStart(2, "0")}:00
            </span>

            {/* Checkbox – visibile solo se esiste il todo */}
            {todo && (
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                aria-label={`Completa To-Do delle ${hour}`}
              />
            )}

            {/* Testo o input */}
            {isEditing ? (
              <input
                className="text-input single"
                value={editingText}
                autoFocus
                onChange={(e) => setEditingText(e.target.value)}
                onKeyUp={(e) => handleKeyUp(hour, todo, e)}
                aria-label={todo ? "Modifica To-Do" : "Crea To-Do"}
              />
            ) : (
              <span
                className={`todo-text ${todo?.completed ? "done" : ""}`}
                onClick={() => startEdit(hour, todo ? todo.text : "")}
                style={{textDecoration: todo?.completed ? 'line-through' : 'none'}}
                
              >
                {todo ? todo.text : "clicca per aggiungere"}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

