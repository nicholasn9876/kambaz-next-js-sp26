"use client";
import Link from "next/link";
import AssignmentsTopBar from "./AssignmentsTopBar";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import AssignmentGroupCtrlBtns from "./AssignmentGroupCtrlBtns";
import AssignmentCtrlBtns from "./AssignmentCtrlBtns";
import * as client from "./client";
import { useParams } from "next/navigation";
import { RootState } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, deleteAssignment, setAssignments } from "./reducer";
import { useState, useEffect } from "react";
import DeleteConfirmation from "./DeleteConfirmation";

export default function Assignments() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  if (!currentUser) {
    return (<div>Not logged in.</div>)
  }
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const { cid } = useParams();
  const onRemoveAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(setAssignments(assignments.filter((a: any) => a._id !== assignmentId)));
  };
  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const fmt = Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id: string, name: string) => {
    setIdToDelete(id);
    setNameOfAToDelete(name);
    setShow(true);
  };
  const [idToDelete, setIdToDelete] = useState("");
  const [nameOfAToDelete, setNameOfAToDelete] = useState("");
  return (
    <div id="wd-assignments">
      <AssignmentsTopBar userRole={currentUser.role} /> <br /> <br />
      <ListGroup className="rounded-0" id="wd-assignment-groups">
        <ListGroupItem className="wd-assignment-group p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentGroupCtrlBtns />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            {assignments.map((assignment, idx) => (
              <ListGroupItem key={idx} className="wd-assignment p-3 ps-1">
                <div className="d-flex">
                  <div className="text-nowrap">
                    <BsGripVertical className="me-2 fs-3" /> <MdOutlineAssignment className="me-2 fs-3 text-success" />
                  </div>
                  <div className="flex-fill me-auto">
                    <Link className="text-decoration-none text-dark" href={`/courses/${cid}/assignments/${assignment._id}`}>
                      <span className="fw-bold fs-4">{assignment.title}</span> <br />
                    </Link>
                    <span className="fs-6">
                      <span className="text-danger me-1">Multiple Modules</span> |
                      <span className="ms-1 text-muted fw-bold">Not available until </span>
                      <span className="me-1">{fmt.format(new Date(assignment.availFrom))}</span> |
                      <span className="ms-1 text-muted fw-bold">Due </span>
                      <span className="me-1">{fmt.format(new Date(assignment.due))}</span> |
                      <span className="ms-1">{assignment.pts + "pts"}</span>
                    </span>
                  </div>
                  <div className="text-nowrap"> <AssignmentCtrlBtns userRole={currentUser.role} assignmentId={assignment._id} assignmentName={assignment.title} showDeleteConfirmation={(id: string, name: string) => handleShow(id, name)} /> </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
      <DeleteConfirmation show={show} handleClose={handleClose} dialogTitle={`Are you sure you want to delete assignment ${nameOfAToDelete}?`}
        assignmentId={idToDelete} deleteAssignment={(aid: string) => {
          onRemoveAssignment(aid)
        }} />
    </div>
  );
}
