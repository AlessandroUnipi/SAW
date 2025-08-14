// src/hooks/useTodoLocal.ts
import { useEffect, useState } from "react";
import { Todo, TodoApi, dayKeyOf, monthKeyOf } from "./ToDo";

export const useTodoLocal = (id: string, date: Date): TodoApi => {
  const STORAGE_KEY = `todos_${id}`;

  const [todos, setTodos] = useState<Todo[]>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo: TodoApi["addTodo"] = (hour, text) => {
    setTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        hour,
        text,
        completed: false,
        dayKey: dayKeyOf(date),
        monthKey: monthKeyOf(date),
      },
    ]);
  };

  const toggleTodo: TodoApi["toggleTodo"] = (tid) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === tid ? { ...t, completed: !t.completed } : t))
    );

  const deleteTodo: TodoApi["deleteTodo"] = (tid) =>
    setTodos((prev) => prev.filter((t) => t.id !== tid));

  const updateTodo: TodoApi["updateTodo"] = (todo) =>
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, ...todo } : t)));

  const getTodosByHour: TodoApi["getTodosByHour"] = (hour) => {
    const key = dayKeyOf(date);
    return todos.filter((t) => t.hour === hour && t.dayKey === key);
  };

  return { todos, addTodo, toggleTodo, deleteTodo, updateTodo, getTodosByHour };
};
