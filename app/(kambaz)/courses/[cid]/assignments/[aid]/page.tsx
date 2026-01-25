export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of your Web application.
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input type="number" id="wd-points" defaultValue={100} />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="wd-agroup">Assignment Group</label>
          </td>
          <td>
            <select id="wd-agroup" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="wd-display-type">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-type" defaultValue="PERCENTAGE">
              <option value="PERCENTAGE">Percentage</option>
              <option value="FRACTION">Fraction</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type" defaultValue="ONLINE">
              <option value="ONLINE">Online</option>
            </select>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <label>Online Entry Options</label> <br />
            <input type="checkbox" name="entry-options" id="wd-entry-opt-text"/>
            <label htmlFor="wd-entry-opt-text">Text Entry</label><br/>

            <input type="checkbox" name="entry-options" id="wd-entry-opt-url"/>
            <label htmlFor="wd-entry-opt-url">Website URL</label><br/>

            <input type="checkbox" name="entry-options" id="wd-entry-opt-media"/>
            <label htmlFor="wd-entry-opt-media">Media Recordings</label><br/>

            <input type="checkbox" name="entry-options" id="wd-entry-opt-student-annot"/>
            <label htmlFor="wd-entry-opt-student-annot">Student Annotation</label><br/>

            <input type="checkbox" name="entry-options" id="wd-entry-opt-file"/>
            <label htmlFor="wd-entry-opt-file">File Uploads</label>
          </td>
        </tr>
        <tr>
          <td>
            <label>Assign</label>
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign to</label><br/>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input type="text" defaultValue="Everyone" id="wd-assign-to"></input>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <label htmlFor="wd-due-date">Due</label>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input type="date" defaultValue="2026-05-13" id="wd-due-date"></input>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <table>
              <tr>
                <td>
                  <label htmlFor="wd-avail-start">Available from</label>
                </td>
                <td>
                  <label htmlFor="wd-avail-end">Until</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="date" defaultValue="2026-05-06" id="wd-avail-start"></input>
                </td>
                <td><input type="date" defaultValue="2026-05-20" id="wd-avail-end"></input></td>
              </tr>
            </table>
            
          </td>
        </tr>
      </table>
    </div>
);}
