import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/CS1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.png" width={175} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer.
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/courses/CS3650" className="wd-dashboard-course-link">
                <Image src="/images/systems.jpg" width={200} height={150} alt="systems" />
                <div>
                    <h5>CS3650 Computer Systems</h5>
                    <p className="wd-dashboard-course-title">
                        Introduces the basic design of computer systems.
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/courses/CS1800" className="wd-dashboard-course-link">
                <Image src="/images/discrete.png" width={200} height={150} alt="discrete" />
                <div>
                    <h5> CS1800 Discrete Structures </h5>
                    <p className="wd-dashboard-course-title"> Introduces the mathematical structures and methods that form the foundation of CS.</p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/courses/CY2550" className="wd-dashboard-course-link">
                <Image src="/images/cybersec.jpg" width={200} height={150} alt="cybersec" />
                <div>
                    <h5> CY2550 Foundations of Cybersecurity </h5>
                    <p className="wd-dashboard-course-title"> Presents an overview of basic security principles and concepts.</p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/courses/DS3000" className="wd-dashboard-course-link">
                <Image src="/images/datascience.png" width={200} height={150} alt="data science" />
                <div>
                    <h5> DS3000 Foundations of Data Science </h5>
                    <p className="wd-dashboard-course-title"> Introduces the mathematical concepts and methods that form the basis for machine learning.</p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/courses/CS3200" className="wd-dashboard-course-link">
                <Image src="/images/databases.png" width={200} height={150} alt="mysql" />
                <div>
                    <h5> CS3200 Introduction to Databases </h5>
                    <p className="wd-dashboard-course-title"> Presents how to design a relation database and how to query using SQL.</p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/courses/CS3000" className="wd-dashboard-course-link">
                <Image src="/images/algorithms.png" width={150} height={150} alt="algorithms" />
                <div>
                    <h5> CS300 Algorithms and Data </h5>
                    <p className="wd-dashboard-course-title"> Introduces the basic principles and techniques for the design, analysis, and implementation of algorithms and data representations.</p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
      </div>
    </div>
);}
