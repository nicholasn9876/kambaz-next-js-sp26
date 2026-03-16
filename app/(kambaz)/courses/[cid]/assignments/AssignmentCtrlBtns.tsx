import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "../modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa6";
import { deleteAssignment } from "./reducer";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

export default function AssignmentCtrlBtns({ userRole, assignmentId, assignmentName, showDeleteConfirmation }: {
  userRole: string, assignmentId: string; assignmentName: string; showDeleteConfirmation: (id: string, name: string) => void}) {
  return (
    <div className="float-end">
      {(userRole === "FACULTY" || userRole === "ADMIN") && <FaTrash className="text-danger me-2 mb-1" onClick={() => showDeleteConfirmation(assignmentId, assignmentName)}/>}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div> );}