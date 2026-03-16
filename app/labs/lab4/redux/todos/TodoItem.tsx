import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id} className="d-flex flex-row-reverse">
            <Button onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click" className="btn btn-danger m-1"> Delete </Button>
            <Button onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click" className="btn btn-primary m-1"> Edit </Button>
            <span className="me-auto">{todo.title}</span>
          </ListGroupItem>);}