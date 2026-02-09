import Link from "next/link";
export default function AccountNavigation() {
 return (
   <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
     <Link href="signin" className="list-group-item active border-0"> Signin </Link> <br />
     <Link href="signup" className="list-group-item text-danger border-0"> Signup </Link> <br />
     <Link href="profile" className="list-group-item text-danger border-0"> Profile </Link> <br />
   </div>
  //  <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
  //     <Link href="/courses/CS1234/home" id="wd-course-home-link"
  //       className="list-group-item active border-0"> Home </Link><br />
  //     <Link href="/courses/CS1234/modules" id="wd-course-modules-link"
  //       className="list-group-item text-danger border-0"> Modules </Link><br />
  //     <Link href="/courses/CS1234/piazza" id="wd-course-piazza-link"
  //       className="list-group-item text-danger border-0"> Piazza </Link><br />
  //     <Link href="/courses/CS1234/zoom" id="wd-course-zoom-link"
  //       className="list-group-item text-danger border-0"> Zoom </Link><br />
  //     <Link href="/courses/CS1234/assignments" id="wd-course-assignments-link"
  //       className="list-group-item text-danger border-0"> Assignments </Link><br />
  //     <Link href="/courses/CS1234/quizzes" id="wd-course-quizzes-link"
  //       className="list-group-item text-danger border-0"> Quizzes </Link><br />
  //     <Link href="/courses/CS1234/people/table" id="wd-course-people-link"
  //       className="list-group-item text-danger border-0" > People </Link><br />
  //   </div>
);}
