import { Form, FormLabel, FormControl, FormSelect, FormCheck, Row, Col, Button } from "react-bootstrap";
import Link from "next/link"

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <FormLabel htmlFor="wd-assignment-name-field">Assignment Name</FormLabel>
      <FormControl id="wd-assignment-name-field" defaultValue="A1 - ENV + HTML"/> <br/>

      <FormControl as="textarea" rows={14} id="wd-assignment-description-field" 
        defaultValue="The assignment is available online. Submit a link to the landing page of your Web application."/> <br/>

      {/* Points */}
      <Row>
        <Col md={3}>
          <FormLabel htmlFor="wd-assignment-points-field" className="d-block text-end">
            Points
          </FormLabel> 
        </Col>
        <Col md={9}>
          <FormControl id="wd-assignment-points-field" defaultValue="100"/>
        </Col>
      </Row> <br/>

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
      </Row> <br/>

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
      </Row> <br/>

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
            </FormSelect> <br/>
            <FormLabel htmlFor="wd-online-entry-options" className="fw-bold text-muted">
              Online Entry Options
            </FormLabel>
            <FormCheck key="TEXT-ENTRY" type="checkbox" label="Text Entry" className="mb-3" id="wd-entry-text"/>
            <FormCheck key="URL" type="checkbox" label="Website Url" className="mb-3" id="wd-entry-url"/>
            <FormCheck key="MEDIA-REC" type="checkbox" label="Media Recordings" className="mb-3" id="wd-entry-rec"/>
            <FormCheck key="STUDENT-ANNOT" type="checkbox" label="Student Annotation" className="mb-3" id="wd-entry-annot"/>
            <FormCheck key="FILE-UPLOAD" type="checkbox" label="File Uploads" className="mb-3" id="wd-entry-file"/>
          </div>
        </Col>
      </Row> <br/>

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
            <FormControl id="wd-assign-to-form" defaultValue="Everyone"/> <br/>

            <FormLabel htmlFor="wd-assign-due" className="text-muted fw-bold">Due</FormLabel>
            <FormControl id="wd-assign-due" defaultValue="May 13, 2024, 11:59pm"/> <br/>

            <Row>
              <Col xs={6}>
                <FormLabel htmlFor="wd-assign-avail-from" className="text-muted fw-bold">Available From</FormLabel>
                <FormControl id="wd-assign-avail-from" defaultValue="May 6, 2024, 12:00am"/> <br/>
              </Col>
              <Col xs={6}>
                <FormLabel htmlFor="wd-assign-until" className="text-muted fw-bold">Until</FormLabel>
                <FormControl id="wd-assign-until" defaultValue="May 13, 2024, 11:59pm"/> <br/>
              </Col>
            </Row>
          </div>
        </Col>
      </Row> <br/>
      <hr/>
      
      {/* Cancel and Save buttons, no functionality except link to assignments */}
      <Link href="./">
        <Button variant="danger" className="me-1 float-end" id="wd-save-assignment-btn">
          Save
        </Button>
      </Link>
      <Link href="./">
        <Button variant="secondary" className="me-1 float-end" id="wd-cancel-assignment-btn">
          Cancel
        </Button>
      </Link>
    </div>
);}
