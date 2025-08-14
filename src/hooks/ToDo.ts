import { useEffect, useState } from "react";


export interface Todo {
    id: string;
    hour: number;
    text: string;
    completed: boolean;
};

export const useTodo = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Aggiungo le funzioni: addTodo, toggleTodo, deleteTodo, updateTodo
    const addTodo = ( hour: number, text: string) => {
        setTodos(prev => [
            ...prev,
            {id: window.crypto.randomUUID(), hour, text, completed: false},
        ])
    };

    const toggleTodo = (id: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? {...todo, completed: !todo.completed }: todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => 
            prev.filter(todo =>
                todo.id !== id
            )
        );
    };

    const updateTodo = (todo: Todo) => {
        setTodos(prev => 
            prev.map(t =>
            (t.id === todo.id ? {...t, ...todo}: t),
            )
        )
    }

    //Iserisco i Todo nelle loro ore
    const getTodosbyHours = (hour: number) => {
        return todos.filter(todo => todo.hour === hour);
    };

    return { todos, addTodo, toggleTodo, deleteTodo, getTodosbyHours, updateTodo };
};

