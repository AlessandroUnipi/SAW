import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { db } from "../firebase/firebaseConfig";
import type { Todo } from "./ToDo";

/**
 * Hook Firestore
 * --------------
 * Salva e sincronizza i Todo di UN utente (uid) nel giorno corrente.
 */
export const useTodoFS = (uid: string) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  /* 1. evita crash se uid mancante (es. prima del login) */
  if (!uid) {
    return {
      todos,
      addTodo: () => {},
      toggleTodo: () => {},
      deleteTodo: () => {},
      updateTodo: () => {},
      getTodosByHour: () => [],
    } as const;
  }

  /* 2. listener realtime sul giorno corrente */
  useEffect(() => {
    const today = new Date().toLocaleDateString("it-IT"); // YYYY-MM-DD
    const ref   = collection(db, "users", uid, "todos");
    const q     = query(ref, where("dayKey", "==", today), orderBy("hour"));

    const unsub = onSnapshot(q, (snap) =>
      setTodos(
        snap.docs.map(
          (d) => ({ id: d.id, ...(d.data() as Omit<Todo, "id">) }) as Todo,
        ),
      ),
    );

    return unsub; // pulizia al cambio user / giorno
  }, [uid]);


  const addTodo = useCallback(
    (hour: number, text: string) => {
      const dayKey   = new Date().toLocaleDateString("it-IT");
      const monthKey = dayKey.slice(0, 7);

      return addDoc(collection(db, "users", uid, "todos"), {
        hour,
        text,
        completed: false,
        dayKey,
        monthKey,
      });
    },
    [uid],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      const tgt = todos.find((t) => t.id === id);
      if (!tgt) return;
      return updateDoc(doc(db, "users", uid, "todos", id), {
        completed: !tgt.completed,
      });
    },
    [uid, todos],
  );

  const deleteTodo = (id: string) =>
    deleteDoc(doc(db, "users", uid, "todos", id));

  const updateTodo = (todo: Todo) => {
    const { id, ...rest } = todo;
    return updateDoc(doc(db, "users", uid, "todos", id), rest);
  };

  /* 4. helper */
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
