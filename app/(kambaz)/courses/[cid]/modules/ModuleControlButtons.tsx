import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function ModuleControlButtons({ moduleId, deleteModule, editModule, userRole }: { 
  moduleId: string; deleteModule: (moduleId: string) => void; editModule: (moduleId: string) => void; userRole: string}) {
  return (
    <div className="float-end">
      {(userRole === "ADMIN" || userRole === "FACULTY") && (<span>
      <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/></span>)}
      <GreenCheckmark />
      <BsPlus className="fs-2"/>
      <IoEllipsisVertical className="fs-4" />
    </div> );}