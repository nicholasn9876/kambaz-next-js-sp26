import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "@/app/(kambaz)/database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments
}
const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = { ...assignment, _id: uuidv4() };
      state.assignments = [...state.assignments, newAssignment]
    },
    deleteAssignment: ( state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (assignment: any) => assignment._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) => 
      a._id === assignment._id ? assignment : a) as any;
    },
    setAssignments: ( state, { payload: assignments }) => {
      state.assignments = assignments;
    }
  }
})
export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } = 
  assignmentSlice.actions;
  export default assignmentSlice.reducer;