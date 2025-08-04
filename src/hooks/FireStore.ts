import {collection, addDoc, updateDoc, deleteDoc, doc,  query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState, useEffect } from "react";

import type {Todo } from "./ToDo"
import { auth } from "../firebase/firebaseConfig";



const todosRef = (uid: string) => collection(db, "users", uid, "todos");

export const useTodoFS = () => {
  const uid = auth.currentUser!.uid;
  const [todos, setTodos] = useState<Todo[]>([]);

  // --- lettura realtime del giorno corrente ---
  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD");
    const q = query(
      todosRef(uid),
      where("dayKey", "==", today),
      orderBy("hour")
    );
    const unsub = onSnapshot(q, snap =>
      setTodos(snap.docs.map(d => ({ id: d.id, ...d.data() } as Todo)))
    );
    return unsub;
  }, [uid]);

  // --- CRUD ---
  const addTodo = (hour: number, text: string) =>
    addDoc(todosRef(uid), {
      text,
      completed: false,                      // boolean
      dayKey: dayjs().format("YYYY-MM-DD"),
      monthKey: dayjs().format("YYYY-MM"),
      hour,
    });

  const updateTodo = (todo: Todo) =>
    updateDoc(doc(db, "users", uid, "todos", todo.id), todo);

  const toggleTodo = (id: string) => {
    const t = todos.find(t => t.id === id)!;
    updateDoc(doc(db, "users", uid, "todos", id), {
      completed: !t.completed,               // flip boolean
    });
  };

  const deleteTodo = (id: string) =>
    deleteDoc(doc(db, "users", uid, "todos", id));

  return { todos, addTodo, updateTodo, toggleTodo, deleteTodo };
};