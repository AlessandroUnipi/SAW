import { useEffect, useState } from "react";
import type { Todo } from "./ToDo";

/**
 * useTodoLocal
 * ------------
 * Salva i To-Do nel LocalStorage del browser.
 * • La chiave è `todos_<id>`  (es.  todos_ospite  oppure  todos_<uid>)
 * • Restituisce lo stesso set di funzioni di useTodo / useTodoFS
 */
export const useTodoLocal = (id: string) => {
  const STORAGE_KEY = `todos_${id}`;

  /* ---------- stato ---------- */
  const [todos, setTodos] = useState<Todo[]>(() => {
    /* lettura iniziale dal LS */
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  });

  /* ---------- persistenza ---------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  /* ---------- CRUD ---------- */
  const addTodo = (hour: number, text: string) =>
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), hour, text, completed: false },
    ]);

  const toggleTodo = (id: string) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

  const deleteTodo = (id: string) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const updateTodo = (todo: Todo) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, ...todo } : t)),
    );

  const getTodosByHour = (hour: number) =>
    todos.filter((t) => t.hour === hour);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    getTodosByHour,
  } as const;
};
