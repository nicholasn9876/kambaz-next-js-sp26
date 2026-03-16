import { useTodos } from "./todosContext"
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap"
export default function ReactContextTodoList() {
  const { todos, todo, update, add, del, set } = useTodos()!

  return (
    <div id="wd-todo-context">
      <h2>Context Todo List</h2>
      <ListGroup>
         <ListGroupItem className="d-flex flex-row-reverse">
          <Button onClick={() => add()}
                  id="wd-add-todo-click" className="btn btn-success m-1"> Add </Button>
          <Button onClick={() => update()}
                  id="wd-update-todo-click" className="btn btn-warning m-1"> Update </Button>
          <FormControl value={todo.title}
            onChange={(e) => set({ ...todo, title: e.target.value })} className="m-1 me-auto"/>
        </ListGroupItem>
        {todos.map((todoItem: {id?: string, title: string}) => (
          <ListGroupItem key={todoItem.id} className="d-flex flex-row-reverse">
            <Button onClick={() => del(todoItem.id!)}
                    id="wd-delete-todo-click" className="btn btn-danger m-1"> Delete </Button>
            <Button onClick={() => set(todoItem)}
                    id="wd-set-todo-click" className="btn btn-primary m-1"> Edit </Button>
            <span className="me-auto">{todoItem.title}</span>
          </ListGroupItem>
        ))}
      </ListGroup><hr/>
    </div>
  )
}