import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "@/app/(kambaz)/database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  quizzes: quizzes
}
const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz = { ...quiz, _id: uuidv4() };
      state.quizzes = [...state.quizzes, newQuiz]
    },
    deleteQuiz: ( state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (quiz: any) => quiz._id !== quizId
      );
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) => 
      q._id === quiz._id ? quiz : q) as any;
    },
    setQuizzes: ( state, { payload: quizzes }) => {
      state.quizzes = quizzes;
    }
  }
})
export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } = 
  quizSlice.actions;
  export default quizSlice.reducer;