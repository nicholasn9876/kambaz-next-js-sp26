import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function ArrayStateVariable() {
 const { todos } = useSelector((state: RootState) => state.todosReducer);
 const [array, setArray] = useState([1, 2, 3, 4, 5]);
 const addElement = () => {
   setArray([...array, Math.floor(Math.random() * 100)]);
 };
const deleteElement = (index: number) => {
   setArray(array.filter((item, i) => i !== index));
 };
 return (
  <div id="wd-array-state-variables">
   <h2>Array State Variable</h2>
   <button onClick={addElement} className="btn btn-success">Add Element</button>
   <ul className="ps-0">
    {array.map((item, index) => (
     <li key={index} className="d-flex justify-content-between border rounded p-2 pe-3 ps-3 fs-4"> {item}
      <button onClick={() => deleteElement(index)} className="btn btn-danger ms-1">
       Delete</button>
     </li>))}
   </ul><hr/>
   <h3>Redux Todos Test</h3>
   <ListGroup>
    {todos.map((todo: any) => (
      <ListGroupItem key={todo.id}>
        {todo.title}
      </ListGroupItem>
    ))}
  </ListGroup>
  <hr /></div>);}