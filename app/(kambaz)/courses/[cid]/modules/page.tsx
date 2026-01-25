export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <button>Collapse All</button> &nbsp;
      <button>View Progress</button> &nbsp;
      <select id="wd-publish-select" defaultValue = "Publish All">
        <option value="ALL">Publish All</option>
        <option value="ONE">Publish One</option>
      </select> &nbsp;
      <button> + Module</button>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
              <span className="wd-title">READING</span>
              <ul>
                <li className="wd-content-item">Full Stack Developer - Ch1</li>
                <li className="wd-content-item">Full Stack Developer - Ch2</li>
              </ul>
              <span className="wd-title">SLIDES</span>
              <ul>
                <li className="wd-content-item">Intro to Web Dev</li>
                <li className="wd-content-item">Creating a React App</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module"> <div className="wd-title">Week 2</div> </li>
        <li className="wd-module"> <div className="wd-title">Week 3</div> </li>
      </ul>
    </div>
);}
