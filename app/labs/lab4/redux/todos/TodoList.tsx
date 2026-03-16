import { useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { RootState } from "../../store";

export default function TodoList() {
    const { todos } = useSelector((state: RootState) => state.todosReducer);
  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
         <TodoForm />
        {todos.map((todo: any, idx) => (
          <TodoItem key={idx} todo={todo} />
        ))}
      </ListGroup><hr/>
</div>);}