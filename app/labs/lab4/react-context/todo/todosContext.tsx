"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface TodosContextState {
  todos: { id?: string, title: string }[];
  todo: { id?: string, title: string };
  update: () => void;
  add: () => void;
  del: (idToRemove: string) => void;
  set: (toSet: { id?: string, title: string }) => void;
}

// Create the context
const TodosContext = createContext<TodosContextState | undefined>(
  undefined,
);


// Create the provider component
export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<{id?: string, title: string}[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodo] = useState<{id?: string, title: string}>({id: undefined, title: "Learn Mongo"});
  const update = () => {
    const newTodos = todos.map((item: {id?: string, title: string}) =>
        item.id === todo.id ? todo : item
      );
    setTodos(newTodos);
    setTodo({title: ""});
  };

  const add = () => {
    const newTodos = [
      ...todos,
      {...todo, id: new Date().getTime().toString()}
    ]
    setTodos(newTodos);
  }

  const del = (idToRemove : string) => {
    const newTodos = todos.filter((item) => item.id != idToRemove)
    setTodos(newTodos);
  }

  const set = (toSet: {id?: string, title: string}) => {
    setTodo(toSet);
  }

  const value: TodosContextState = {
    todos,
    todo,
    update,
    add,
    del,
    set
  };

  return (
    <TodosContext.Provider value= { value } > { children } </TodosContext.Provider>
 );
};


// Create a custom hook to use the counter context
export const useTodos = () => {
  const context = useContext(TodosContext);
  return context;
};
