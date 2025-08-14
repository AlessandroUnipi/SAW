// src/hooks/Todo.ts
export interface Todo {
  id: string;
  hour: number;
  text: string;
  completed: boolean;
  /** Parità con Firestore/Local: chiavi di data */
  dayKey?: string;   // "YYYY-MM-DD"
  monthKey?: string; // "YYYY-MM"
}

/** API comune che i due hook espongono */
export interface TodoApi {
  todos: Todo[];
  addTodo:    (hour: number, text: string) => Promise<void> | void;
  toggleTodo: (id: string) => Promise<void> | void;
  deleteTodo: (id: string) => Promise<void> | void;
  updateTodo: (todo: Todo) => Promise<void> | void;
  getTodosByHour: (hour: number) => Todo[];
}

/** Util per chiavi data consistenti (locale, non UTC) */
export const pad = (n: number) => String(n).padStart(2, "0");
export const dayKeyOf = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; // YYYY-MM-DD
export const monthKeyOf = (d: Date) => dayKeyOf(d).slice(0, 7);       // YYYY-MM
