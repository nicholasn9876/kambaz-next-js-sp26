import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { HiNoSymbol } from "react-icons/hi2";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import GreenCheckmark from "./GreenCheckmark";
export default function ModulesControls({ moduleName, setModuleName, addModule, userRole }:
{ moduleName: string; setModuleName: (title: string) => void; addModule: () => void; userRole: string }) {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  if (!currentUser) {
    return (<div>Not logged in.</div>)
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {(userRole === "ADMIN" || userRole === "FACULTY") && (<span>
      <Button variant="danger" onClick={handleShow} size="lg" className="me-1 float-end" id="wd-add-module-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>
      <Dropdown className="float-end me-2">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            <HiNoSymbol className="me-2 fs-5"/>
            Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            <HiNoSymbol className="me-2 fs-5"/>
            Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-view-progress">View Progress</Button></span>)}
      <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-collapse-all">Collapse All</Button>
      {(userRole === "ADMIN" || userRole === "FACULTY") && (
      <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
       moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />)}
    </div>
  );
}
