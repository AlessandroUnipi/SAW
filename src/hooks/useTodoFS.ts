// src/hooks/useTodoFS.ts
import {
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc
} from "firebase/firestore";

import { useEffect, useState, useCallback } from "react";
import { db } from "../firebase/firebaseConfig";
import { Todo, TodoApi, dayKeyOf, monthKeyOf } from "./ToDo";

export const useTodoFS = (uid: string, date: Date): TodoApi => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const key = dayKeyOf(date);
    const ref = collection(db, "users", uid, "todos");
    const q = query(ref, where("dayKey", "==", key), orderBy("hour"));

    const unsub = onSnapshot(
      q,
      (snap) =>
        setTodos(
          snap.docs.map(
            (d) => ({ id: d.id, ...(d.data() as Omit<Todo, "id">) }) as Todo
          )
        ),
      (err) => console.error("Firestore onSnapshot error:", err)
    );
    return unsub;
  }, [uid, date]);

  
  if (!uid) {
    return {
      todos,
      addTodo: async () => {},
      toggleTodo: async () => {},
      deleteTodo: async () => {},
      updateTodo: async () => {},
      getTodosByHour: () => [],
    };
  }

  const addTodo = useCallback(
    async (hour: number, text: string) => {
      try {
        const key = dayKeyOf(date);
        await addDoc(collection(db, "users", uid, "todos"), {
          hour,
          text,
          completed: false,
          dayKey: key,
          monthKey: monthKeyOf(date),
        });
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
      } catch (err) {
        console.error("Firestore addTodo error:", err);
      }
    },
    [uid, date]
  );

  const toggleTodo = useCallback(
    async (id: string) => {
      try {
        const tgt = todos.find((t) => t.id === id);
        if (!tgt) return;
        await updateDoc(doc(db, "users", uid, "todos", id), {
          completed: !tgt.completed,
        });
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
      } catch (err) {
        console.error("Firestore toggleTodo error:", err);
      }
    },
    [uid, todos]
  );

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, "users", uid, "todos", id));
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Firestore deleteTodo error:", err);
    }
  };

  const updateTodo = async (todo: Todo) => {
    try {
      const { id, ...rest } = todo;
      await updateDoc(doc(db, "users", uid, "todos", id), rest);
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, ...todo } : t)));

    } catch (err) {
      console.error("Firestore updateTodo error:", err);
    }
  };

  const getTodosByHour = (hour: number) => todos.filter((t) => t.hour === hour);

  return { todos, addTodo, toggleTodo, deleteTodo, updateTodo, getTodosByHour };
};
