import { useEffect, useRef } from "react";
import { Todo } from "./ToDo";

export function useNotificationScheduler(todos: Todo[], selectedDate: Date) {
  const timers = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Pulisce tutti i timer precedenti se i todos o la data cambiano
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const now = new Date();

    todos.forEach((todo) => {
      const todoTime = new Date(selectedDate);
      todoTime.setHours(todo.hour, 0, 0, 0);

      const notifyTime = new Date(todoTime.getTime() - 10 * 60 * 1000); // 10 min prima

      if (notifyTime > now) {
        const timeoutMs = notifyTime.getTime() - now.getTime();
        const timeoutId = setTimeout(() => {
          new Notification("Promemoria ToDo", {
            body: todo.text,
            icon: "./assets/Calendar.png",
            tag: `todo-${todo.id}`,
          });
        }, timeoutMs);

        timers.current.push(timeoutId);
      }
    });

    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, [todos, selectedDate]);
}
