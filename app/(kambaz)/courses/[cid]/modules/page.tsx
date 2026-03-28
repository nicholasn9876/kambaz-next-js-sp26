"use client"
import { useParams } from "next/navigation";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { useState } from "react";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

export default function Modules() {
  
  const { cid } = useParams();
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState("");
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  if (!currentUser) {
    return (<div>Not logged in.</div>)
  }
  return (
    <div>
      <ModulesControls userRole={currentUser.role} setModuleName={setModuleName} moduleName={moduleName} addModule={() => {
        dispatch(addModule({ name: moduleName, course: cid }));
        setModuleName("");
      }} /> <br /> <br /> <br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any, idx) => (
            <ListGroupItem key={idx} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" /> {!module.editing && module.name}
                {module.editing && (
                  <FormControl className="w-50 d-inline-block"
                    onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name} />
                )} <ModuleControlButtons userRole={currentUser.role} moduleId={module._id} deleteModule={
                  (moduleId) => dispatch(deleteModule(moduleId))
                }
                  editModule={(moduleId) => dispatch(editModule(moduleId))
                  } /> </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any, lessonIdx: number) => (
                    <ListGroupItem key={lessonIdx} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons /> </ListGroupItem>
                  ))}</ListGroup>)}</ListGroupItem>))}</ListGroup>
    </div>
  );
}
