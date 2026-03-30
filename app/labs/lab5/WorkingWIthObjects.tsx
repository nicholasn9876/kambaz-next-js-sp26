"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [module, setModule] = useState({
    id: 1, title: "Lecture 16, 17, Assignment 5",
    description: "Implementing RESTful APIs with Express.js",
    course: "CS4550"
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Assignments</h4> <br />
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr />
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr />
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })} /> <br />

      <h4>Modules</h4> <br/>
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-module" className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/module`}>
        Get Module
      </a><hr />
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-module-title" className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/module/name`}>
        Get Module Name
      </a><hr />
      <a id="wd-update-module-name"
        className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/name/${module.title}`}>
        Update Name </a>
      <FormControl className="w-75" id="wd-module-name"
        defaultValue={module.title} onChange={(e) =>
          setModule({ ...module, title: e.target.value })} />
      <hr />

    </div>
  );
}
