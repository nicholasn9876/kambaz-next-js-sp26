import { Button, FormControl, Row, Col, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

export default function AssignmentsTopBar() {
  return (
    <div id="wd-assignments-topbar" className="text-nowrap">
      <Row>
        <Col xs={4}>
          <InputGroup className="float-start ms-1">
            <InputGroupText className="bg-white border-end-0">
              <CiSearch/>
            </InputGroupText>
              <FormControl className="border-start-0" id="wd-assignment-search-field" placeholder="Search..."/>
          </InputGroup>
        </Col>
        <Col xs={8}>
          <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assigment-btn">
            <FaPlus className="position-relative me-1" style={{bottom: "1px" }}/> Assignment
          </Button>
          <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-assigment-btn">
            <FaPlus className="position-relative me-1" style={{bottom: "1px" }}/> Group
          </Button>
        </Col>
      </Row>
    </div>
  )
}