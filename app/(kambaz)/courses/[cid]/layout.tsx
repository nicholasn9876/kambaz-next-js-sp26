"use client";
import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
// import { courses } from "../../database";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const [courseNavActive, setCourseNavActive] = useState(true);
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <button onClick={() => setCourseNavActive(!courseNavActive)} className="border-0 bg-transparent p-0 me-4 text-danger">
          <FaAlignJustify className="fs-4 mb-1" />
        </button>
        <Breadcrumb course={course} /> </h2> <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          {courseNavActive && <CourseNavigation />}
        </div>
        <div className="flex-fill">
          {children}
        </div></div>
    </div>

  );
}
