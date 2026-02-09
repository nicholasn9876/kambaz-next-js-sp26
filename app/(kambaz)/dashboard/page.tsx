import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
    <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
            <Link href="/courses/CS1234/home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/reactjs.png" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Full Stack software developer</CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
            <Link href="/courses/CS3650/home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/systems.jpg" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3650 Computer Systems</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Introduces the basic design of computer systems.</CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
            <Link href="/courses/CS1800/home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/discrete.png" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1800 Discrete Structures</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Introduces the mathematical structures and methods that form the foundation of CS.</CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
            <Link href="/courses/CY2550/home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/cybersec.jpg" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CY2550 Foundations of Cybersecurity</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Presents an overview of basic security principles and concepts.</CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
            <Link href="/courses/DS3000/home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/datascience.png" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">DS3000 Foundations of Data Science</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Introduces the mathematical concepts and methods that form the basis for machine learning.</CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
            <Link href="/courses/CS3200/home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/databases.png" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3200 Introduction to Databases</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Presents how to design a relation database and how to query using SQL.</CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
            <Link href="/courses/CS3000/home"
                  className="wd-dashboard-course-link text-decoration-none text-dark">
              <CardImg variant="top" src="/images/algorithms.png" width="100%" height={160}/>
              <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS300 Algorithms and Data</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                Introduces the basic principles and techniques for the design, analysis, and implementation of algorithms and data representations.</CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
            </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
);}