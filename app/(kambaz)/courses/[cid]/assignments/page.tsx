"use client";
import Link from "next/link";
import AssignmentsTopBar from "./AssignmentsTopBar";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import AssignmentGroupCtrlBtns from "./AssignmentGroupCtrlBtns";
import AssignmentCtrlBtns from "./AssignmentCtrlBtns";
import * as db from "../../../database";
import { useParams } from "next/navigation";

export default function Assignments() {
  const assignments = db.assignments;
  const { cid } = useParams();
  const course = db.courses.find((course) => course._id === cid);
  const fmt = Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
  return (
    <div id="wd-assignments">
      <AssignmentsTopBar /> <br /> <br />
      <ListGroup className="rounded-0" id="wd-assignment-groups">
        <ListGroupItem className="wd-assignment-group p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentGroupCtrlBtns />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            {assignments.filter((assignment) => (assignment.course === course?._id)).map((assignment) => (
              <ListGroupItem className="wd-assignment p-3 ps-1">
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
                    <span className="ms-1">{assignment.pts}</span>
                  </span>
                </div>
                <div className="text-nowrap"> <AssignmentCtrlBtns /> </div>
              </div>
            </ListGroupItem>
            ))}
            {/* <ListGroupItem className="wd-assignment p-3 ps-1">
              <div className="d-flex">
                <div className="text-nowrap">
                  <BsGripVertical className="me-2 fs-3" /> <MdOutlineAssignment className="me-2 fs-3 text-success" />
                </div>
                <div className="flex-fill me-auto">
                  <Link className="text-decoration-none text-dark" href="/courses/CS1234/assignments/125">
                    <span className="fw-bold fs-4">A1</span> <br />
                  </Link>
                  <span className="fs-6">
                    <span className="text-danger me-1">Multiple Modules</span> |
                    <span className="ms-1 text-muted fw-bold">Not available until </span>
                    <span className="me-1">May 6 at 12:00am</span> |
                    <span className="ms-1 text-muted fw-bold">Due </span>
                    <span className="me-1">May 13 at 11:59pm</span> |
                    <span className="ms-1">100 pts</span>
                  </span>
                </div>
                <div className="text-nowrap"> <AssignmentCtrlBtns /> </div>
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-assignment p-3 ps-1">
              <div className="d-flex">
                <div className="text-nowrap">
                  <BsGripVertical className="me-2 fs-3" /> <MdOutlineAssignment className="me-2 fs-3 text-success" />
                </div>
                <div className="flex-fill me-auto">
                  <Link className="text-decoration-none text-dark" href="/courses/CS1234/assignments/125">
                    <span className="fw-bold fs-4">A2</span> <br />
                  </Link>
                  <span className="fs-6">
                    <span className="text-danger me-1">Multiple Modules</span> |
                    <span className="ms-1 text-muted fw-bold">Not available until </span>
                    <span className="me-1">May 13 at 12:00am</span> |
                    <span className="ms-1 text-muted fw-bold">Due </span>
                    <span className="me-1">May 20 at 11:59pm</span> |
                    <span className="ms-1">100 pts</span>
                  </span>
                </div>
                <div className="text-nowrap"> <AssignmentCtrlBtns /> </div>
              </div>
            </ListGroupItem>
            <ListGroupItem className="wd-assignment p-3 ps-1">
              <div className="d-flex">
                <div className="text-nowrap">
                  <BsGripVertical className="me-2 fs-3" /> <MdOutlineAssignment className="me-2 fs-3 text-success" />
                </div>
                <div className="flex-fill me-auto">
                  <Link className="text-decoration-none text-dark" href="/courses/CS1234/assignments/125">
                    <span className="fw-bold fs-4">A3</span> <br />
                  </Link>
                  <span className="fs-6">
                    <span className="text-danger me-1">Multiple Modules</span> |
                    <span className="ms-1 text-muted fw-bold">Not available until </span>
                    <span className="me-1">May 20 at 12:00am</span> |
                    <span className="ms-1 text-muted fw-bold">Due </span>
                    <span className="me-1">May 27 at 11:59pm</span> |
                    <span className="ms-1">100 pts</span>
                  </span>
                </div>
                <div className="text-nowrap"> <AssignmentCtrlBtns /> </div>
              </div>
            </ListGroupItem> */}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
