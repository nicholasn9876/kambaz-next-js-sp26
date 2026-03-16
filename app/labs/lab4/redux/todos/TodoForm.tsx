import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { RootState } from "../../store"
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { useSelector, useDispatch } from "react-redux";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex flex-row-reverse">
          <Button onClick={() => dispatch(addTodo(todo))}
                  id="wd-add-todo-click" className="btn btn-success m-1"> Add </Button>
          <Button onClick={() => dispatch(updateTodo(todo))}
                  id="wd-update-todo-click" className="btn btn-warning m-1"> Update </Button>
          <FormControl value={todo.title}
            onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} className="m-1 me-auto"/>
        </ListGroupItem>
);}
