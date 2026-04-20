"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
      setLoading(false);
    };
  
  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  if (!currentUser) return <div>Not logged in.</div>;
  if (loading) return <div className="p-4">Loading...</div>;
  if (!quiz) return <div className="p-4">Quiz not found.</div>;

  const isFaculty = ["FACULTY", "ADMIN"].includes(currentUser.role);
  const isStudent = currentUser.role === "STUDENT";

  const fmtDate = (d: string | undefined) => {
    if (!d) return "-";
    const date = new Date(d);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const yesNo = (v: boolean) => (v ? "Yes" : "No");

  // sum points or default to 0
  const totalPoints =
    (quiz.questions || []).reduce(
      (sum: number, q: any) => sum + (q.points || 0),
      0
    ) || quiz.points || 0;

  // student
  if (isStudent) {
    return (
      <div id="wd-quiz-details" className="p-3">
        <h2>{quiz.title}</h2>
        {quiz.description && (
          <div className="mt-3 mb-4">
            {quiz.description}
          </div>
        )}
        <div className="d-flex gap-2 mt-4">
          <Button
            variant="danger"
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/take`)
            }
          >
            Start Quiz
          </Button>
        </div>
      </div>
    );
  }

  // faculty/admin/ta
  return (
    <div id="wd-quiz-details" className="p-3">
      <div className="d-flex justify-content-end align-items-center mb-3 gap-2">
        <Button
          variant="secondary"
          onClick={() =>
            router.push(`/courses/${cid}/quizzes/${qid}/preview`)
          }>
          Preview
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
          Edit
        </Button>
      </div>
      <hr />

      <h2 className="mb-4">{quiz.title}</h2>

      {quiz.description && (
        <div className="mb-4">
          {quiz.description}
        </div>
      )}

      <div className="row">
        <div className="col-md-8">
          <table className="table table-borderless">
            <tbody>
              <DetailRow label="Quiz Type" value={quiz.quizType || "Graded Quiz"} />
              <DetailRow label="Points" value={String(totalPoints)} />
              <DetailRow
                label="Assignment Group"
                value={quiz.assignmentGroup || "Quizzes"}/>
              <DetailRow
                label="Shuffle Answers"
                value={yesNo(quiz.shuffleAnswers)}/>
              <DetailRow
                label="Time Limit"
                value={`${quiz.timeLimit ?? 20} Minutes`}/>
              <DetailRow
                label="Multiple Attempts"
                value={yesNo(quiz.multipleAttempts)}/>
              {quiz.multipleAttempts && (
                <DetailRow
                  label="How Many Attempts"
                  value={String(quiz.howManyAttempts ?? 1)}/>
              )}
              <DetailRow
                label="Show Correct Answers"
                value={quiz.showCorrectAnswers || "Immediately"}/>
              <DetailRow
                label="Access Code"
                value={quiz.accessCode || "-"}/>
              <DetailRow
                label="One Question at a Time"
                value={yesNo(quiz.oneQuestionAtATime)}/>
              <DetailRow
                label="Webcam Required"
                value={yesNo(quiz.webcamRequired)}/>
              <DetailRow
                label="Lock Questions After Answering"
                value={yesNo(quiz.lockQuestionsAfterAnswering)}/>
            </tbody>
          </table>
        </div>
      </div>

      <Table bordered className="mt-4">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{fmtDate(quiz.dueDate)}</td>
            <td>Everyone</td>
            <td>{fmtDate(quiz.availableDate)}</td>
            <td>{fmtDate(quiz.untilDate)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="text-end fw-bold" style={{ width: "40%" }}>
        {label}
      </td>
      <td className="ps-3">{value}</td>
    </tr>
  );
}