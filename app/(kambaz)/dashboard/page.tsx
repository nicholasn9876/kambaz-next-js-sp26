"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import * as client from "../courses/client";
import Image from "next/image";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../courses/reducer";
import { enroll, unenroll, setEnrollments } from "./enrollmentReducer";
import { RootState } from "../store";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    imgPath: "reactjs.png", description: "New Description"
  });
  const fetchCourses = async () => {
    try {
      const courses = await client.fetchAllCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEnrollments = async (userId: string) => {
    try {
      const enrollments = await client.getEnrollmentsForUser(userId);
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  };
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };
  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    })));
  };

  const [showAll, setShowAll] = useState(false);
  if (!currentUser) {
    return (<div>Not logged in.</div>);
  }
  useEffect(() => {
    fetchCourses();
    fetchEnrollments(currentUser._id);
  }, [currentUser]);

  const visibleCourses = showAll ? courses : courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === currentUser._id &&
        enrollment.course === course._id
    ))

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: any) =>
        e.user === currentUser._id &&
        e.course === courseId
    );

  const hasPerms = (currentUser.role === "FACULTY" || currentUser.role === "ADMIN");
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <Button className="btn btn-primary float-end" onClick={() => setShowAll(!showAll)}>Enrollments</Button> <br /><br />
      {hasPerms && (<span>
        <h5>New Course
          <button className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={onAddNewCourse} > Add </button>
          <button className="btn btn-warning float-end me-2"
            onClick={onUpdateCourse} id="wd-update-course-click">
            Update </button>
        </h5><hr />
        <br />
        <FormControl value={course.name} className="mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
        <FormControl value={course.description} as="textarea" rows={3} onChange={(e) => setCourse({ ...course, description: e.target.value })} /></span>)}
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course, idx) => (
            <Col key={idx} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/courses/${course._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src={`/images/${course.imgPath}`} variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </CardText>
                    <Button variant="primary"> Go </Button>
                    {hasPerms && (<span>
                      <button onClick={(event) => {
                        event.preventDefault();
                        onDeleteCourse(course._id);
                      }} className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                        Delete
                      </button>
                      <button id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end" >
                        Edit
                      </button></span>)}
                  </CardBody>
                </Link>
                <CardBody>
                  {(isEnrolled(course._id)) ? (
                    <Button className="btn-danger float-start" onClick={async () => {
                      await client.unenrollFromCourse(currentUser._id, course._id);
                      dispatch(unenroll({ userId: currentUser._id, courseId: course._id }))
                    }}>Unenroll</Button>
                  ) : (
                      <Button className="btn-success float-start" onClick={async () => {
                        await client.enrollIntoCourse(currentUser._id, course._id);
                        dispatch(enroll({ userId: currentUser._id, courseId: course._id }))
                      }}>Enroll</Button>
                    )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}