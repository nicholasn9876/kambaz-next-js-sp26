"use client";
import { Form, FormLabel, FormControl, FormSelect, FormCheck, Row, Col, Button } from "react-bootstrap";
import Link from "next/link"
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { RootState } from "../../../../store";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { useEffect, useState } from "react";

export default function AssignmentEditor() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  if (!currentUser) {
    return (<div>Not logged in.</div>)
  }
  if (!(currentUser.role === "FACULTY" || currentUser.role === "ADMIN")) {
    return (<div>Permission denied.</div>)
  }
  const router = useRouter();
  const { cid } = useParams();
  const { aid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const assignment = assignments.find((a) => a._id === aid);
  const [aName, setAName] = useState("");
  const [aDesc, setADesc] = useState("");
  const [aPts, setAPts] = useState("");
  const [aDue, setADue] = useState("");
  const [aAvailFrom, setAAvailFrom] = useState("");
  const [aAvailUntil, setAAvailUntil] = useState("");
  const isAdding = (aid === "new");
  if (!assignment && !isAdding) {
    return (<div id="wd-invalid-assignment">Assignment Not Found</div>);
  }
  const fmt = Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
  useEffect(() => {
    if (!isAdding) {
      setAName(assignment!.title);
      setADesc(assignment!.description);
      setAPts(assignment!.pts);
      setADue(assignment!.due);
      setAAvailFrom(assignment!.availFrom);
      setAAvailUntil(assignment!.availUntil);
    }
  }, [aid])
  const saveBehavior = () => {
    if (isAdding) {
      dispatch(addAssignment({
        title: aName,
        description: aDesc,
        course: cid,
        pts: aPts,
        due: aDue,
        availFrom: aAvailFrom,
        availUntil: aAvailUntil
      }))
    } else {
      dispatch(updateAssignment({
        ...assignment,
        title: aName,
        description: aDesc,
        course: cid,
        pts: aPts,
        due: aDue,
        availFrom: aAvailFrom,
        availUntil: aAvailUntil
      }))
    }
    router.push("./")
  }
  return (
    <div id="wd-assignments-editor">
      <FormLabel htmlFor="wd-assignment-name-field">Assignment Name</FormLabel>
      <FormControl id="wd-assignment-name-field" defaultValue={aName} onChange={(e) => setAName(e.target.value)} /> <br />

      <FormControl as="textarea" rows={14} id="wd-assignment-description-field"
        defaultValue={aDesc} onChange={(e) => setADesc(e.target.value)} /> <br />

      {/* Points */}
      <Row>
        <Col md={3}>
          <FormLabel htmlFor="wd-assignment-points-field" className="d-block text-end">
            Points
          </FormLabel>
        </Col>
        <Col md={9}>
          <FormControl id="wd-assignment-points-field" type="number" defaultValue={aPts} onChange={(e) => setAPts(e.target.value)} />
        </Col>
      </Row> <br />

      {/* Assignment Group */}
      <Row>
        <Col md={3}>
          <FormLabel htmlFor="wd-assignment-group-dropdown" className="d-block text-end">
            Assignment Group
          </FormLabel>
        </Col>
        <Col md={9}>
          <FormSelect id="wd-assignment-group-dropdown">
            <option value="ASSIGNMENTS" defaultChecked>ASSIGNMENTS</option>
          </FormSelect>
        </Col>
      </Row> <br />

      {/* Grade Display */}
      <Row>
        <Col md={3}>
          <FormLabel htmlFor="wd-grade-display-dropdown" className="d-block text-end">
            Display Grade As
          </FormLabel>
        </Col>
        <Col md={9}>
          <FormSelect id="wd-grade-display-dropdown">
            <option value="PERCENTAGE" defaultChecked>Percentage</option>
            <option value="FRACTION">Fraction</option>
          </FormSelect>
        </Col>
      </Row> <br />

      {/* Submission Type */}
      <Row>
        <Col md={3}>
          <FormLabel htmlFor="wd-submission-type-dropdown" className="d-block text-end">
            Submission Type
          </FormLabel>
        </Col>
        <Col md={9}>
          <div className="border p-3 rounded">
            <FormSelect id="wd-submission-type-dropdown">
              <option value="ONLINE" defaultChecked>Online</option>
              <option value="OTHER">Other</option>
            </FormSelect> <br />
            <FormLabel htmlFor="wd-online-entry-options" className="fw-bold text-muted">
              Online Entry Options
            </FormLabel>
            <FormCheck key="TEXT-ENTRY" type="checkbox" label="Text Entry" className="mb-3" id="wd-entry-text" />
            <FormCheck key="URL" type="checkbox" label="Website Url" className="mb-3" id="wd-entry-url" />
            <FormCheck key="MEDIA-REC" type="checkbox" label="Media Recordings" className="mb-3" id="wd-entry-rec" />
            <FormCheck key="STUDENT-ANNOT" type="checkbox" label="Student Annotation" className="mb-3" id="wd-entry-annot" />
            <FormCheck key="FILE-UPLOAD" type="checkbox" label="File Uploads" className="mb-3" id="wd-entry-file" />
          </div>
        </Col>
      </Row> <br />

      {/* Assign To */}
      <Row>
        <Col md={3}>
          <FormLabel htmlFor="wd-assign-to-form" className="d-block text-end mt-2">
            Assign
          </FormLabel>
        </Col>
        <Col md={9}>
          <div className="border p-3 rounded">
            <FormLabel htmlFor="wd-assign-to-form" className="text-muted fw-bold">Assign To</FormLabel>
            <FormControl id="wd-assign-to-form" defaultValue="Everyone" /> <br />

            <FormLabel htmlFor="wd-assign-due" className="text-muted fw-bold">Due</FormLabel>
            <FormControl id="wd-assign-due" type="datetime-local" defaultValue={aDue} onChange={(e) => setADue(e.target.value)} /> <br />

            <Row>
              <Col xs={6}>
                <FormLabel htmlFor="wd-assign-avail-from" className="text-muted fw-bold">Available From</FormLabel>
                <FormControl id="wd-assign-avail-from" type="datetime-local" defaultValue={aAvailFrom} onChange={(e) => setAAvailFrom(e.target.value)} /> <br />
              </Col>
              <Col xs={6}>
                <FormLabel htmlFor="wd-assign-until" className="text-muted fw-bold">Until</FormLabel>
                <FormControl id="wd-assign-until" type="datetime-local" defaultValue={aAvailUntil} onChange={(e) => setAAvailUntil(e.target.value)} /> <br />
              </Col>
            </Row>
          </div>
        </Col>
      </Row> <br />
      <hr />
        <Button variant="danger" className="me-1 float-end" id="wd-save-assignment-btn" onClick={saveBehavior}>
          Save
        </Button>
        <Button variant="secondary" className="me-1 float-end" id="wd-cancel-assignment-btn" onClick={() => router.push("./")}>
          Cancel
        </Button>
    </div>
  );
}
