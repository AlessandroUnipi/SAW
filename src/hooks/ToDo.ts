export interface Todo {
  id: string;
  hour: number;
  text: string;
  completed: boolean;
  dayKey?: string;   // "YYYY-MM-DD"
  monthKey?: string; // "YYYY-MM"
}

export interface TodoApi {
  todos: Todo[];
  addTodo:    (hour: number, text: string) => Promise<void> | void;
  toggleTodo: (id: string) => Promise<void> | void;
  deleteTodo: (id: string) => Promise<void> | void;
  updateTodo: (todo: Todo) => Promise<void> | void;
  getTodosByHour: (hour: number) => Todo[];
}

export const pad = (n: number) => String(n).padStart(2, "0");
export const dayKeyOf = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; // YYYY-MM-DD
export const monthKeyOf = (d: Date) => dayKeyOf(d).slice(0, 7);       // YYYY-MM
