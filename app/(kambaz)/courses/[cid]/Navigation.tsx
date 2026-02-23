"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
  const pathName = usePathname();

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link href={`/courses/${cid}/${link.toLowerCase()}`} id={`wd-course-${link.toLowerCase()}-link`} className={`list-group-item border-0 ${pathName.includes(link.toLowerCase()) ? "active" : "text-danger"}`} key={links.indexOf(link)}>{link}</Link>
      ))}
    </div>
);}

