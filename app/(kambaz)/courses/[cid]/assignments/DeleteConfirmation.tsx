import { Modal, FormControl, Button } from "react-bootstrap";
export default function DeleteConfirmation({ show, handleClose, dialogTitle, assignmentId, deleteAssignment}: {
 show: boolean; handleClose: () => void; dialogTitle: string; assignmentId: string;
 deleteAssignment: (aid: string) => void; }) {
 return (
  <Modal show={show} onHide={handleClose}>
   <Modal.Header closeButton>
    <Modal.Title>{dialogTitle}</Modal.Title>
   </Modal.Header>
   <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}> Cancel </Button>
    <Button variant="primary"
     onClick={() => {
      deleteAssignment(assignmentId);
      handleClose();
     }} > Delete Assignment </Button>
   </Modal.Footer>
  </Modal>
);}
