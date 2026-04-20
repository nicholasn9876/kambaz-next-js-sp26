"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Form, Alert, ProgressBar, CardBody, CardHeader,
  FormCheck, FormControl
 } from "react-bootstrap";
import { FaCheck, FaTimes, FaEdit, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Student-mode state
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
      setLoading(false);
    };
    fetch();
  }, [qid]);

  if (!currentUser) return <div>Not logged in.</div>;
  if (loading) return <div className="p-4">Loading...</div>;
  if (!quiz) return <div className="p-4">Quiz not found.</div>;

  const questions: any[] = quiz.questions || [];
  const totalPoints = questions.reduce(
    (sum, q) => sum + (Number(q.points) || 0),
    0
  );

  const isCorrect = (q: any, ans: any): boolean => {
    if (ans === undefined || ans === null || ans === "") return false;
    if (q.type === "TRUE_FALSE") {
      return Boolean(ans) === Boolean(q.correctAnswer);
    }
    if (q.type === "MULTIPLE_CHOICE") {
      return ans === q.correctAnswer;
    }
    if (q.type === "FILL_IN_BLANK") {
      const possible = (q.possibleAnswers || []).map((p: string) =>
        String(p).trim().toLowerCase()
      );
      return possible.includes(String(ans).trim().toLowerCase());
    }
    return false;
  };

  const earnedPoints = questions.reduce((sum, q) => {
    return sum + (isCorrect(q, answers[q._id]) ? Number(q.points) || 0 : 0);
  }, 0);

  const setAnswer = (qid: string, value: any) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentIdx(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const oneAtATime = !!quiz.oneQuestionAtATime;
  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== ""
  ).length;

  return (
    <div id="wd-quiz-preview" className="p-3">
      <Button
        variant="outline-dark"
        size="sm"
        onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
        <FaEdit className="me-1" /> Edit Quiz
      </Button> <br/> <br/>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">{quiz.title}</h2>
        <div className="text-end">
          <div>
            <strong>{totalPoints}</strong> points
          </div>
          <div className="text-muted small">
            {questions.length}{" "}
            {questions.length === 1 ? "question" : "questions"}
          </div>
        </div>
      </div>
      {quiz.description && (
        <div className="mb-4 p-3 bg-light rounded">
          {quiz.description}
        </div>
      )}

      {submitted && (
        <Card className="mb-4 border-success">
          <CardBody>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="mb-0">Your Score</h4>
              <h3 className="mb-0 text-success">
                {earnedPoints} / {totalPoints}
              </h3>
            </div>
            <div className="mt-3 d-flex gap-2">
              <Button variant="primary" onClick={handleRetake}>
                Retake
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>
                Back to Quiz Details
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {questions.length === 0 && (
        <div className="text-center p-5 text-muted border rounded">
          This quiz has no questions yet.
        </div>
      )}

      {questions.length > 0 && (
        <>
          {oneAtATime && !submitted && (
            <div className="mb-3 text-muted small">
              Question {currentIdx + 1} of {questions.length} · {answeredCount}{" "}
              answered
            </div>
          )}

          {(oneAtATime && !submitted
            ? [questions[currentIdx]]
            : questions
          ).map((q, displayIdx) => {
            const questionNumber = oneAtATime && !submitted
              ? currentIdx + 1
              : displayIdx + 1;
            return (
              <QuestionCard
                key={q._id}
                question={q}
                questionNumber={questionNumber}
                answer={answers[q._id]}
                onAnswer={(v) => setAnswer(q._id, v)}
                submitted={submitted}
                correct={isCorrect(q, answers[q._id])}
                locked={submitted}/>
            );
          })}

          {!submitted && (
            <div className="d-flex justify-content-between mt-4">
              {oneAtATime ? (
                <>
                  <Button
                    variant="outline-secondary"
                    disabled={currentIdx === 0}
                    onClick={() => setCurrentIdx(currentIdx - 1)}>
                    <FaArrowLeft className="me-1" /> Previous
                  </Button>
                  {currentIdx < questions.length - 1 ? (
                    <Button
                      variant="outline-secondary"
                      onClick={() => setCurrentIdx(currentIdx + 1)}>
                      Next <FaArrowRight className="ms-1" />
                    </Button>
                  ) : (
                    <Button variant="danger" onClick={handleSubmit}>
                      Submit Quiz
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <div />
                  <Button variant="danger" onClick={handleSubmit}>
                    Submit Quiz
                  </Button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function QuestionCard({
  question,
  questionNumber,
  answer,
  onAnswer,
  submitted,
  correct,
  locked,
}: {
  question: any;
  questionNumber: number;
  answer: any;
  onAnswer: (v: any) => void;
  submitted: boolean;
  correct: boolean;
  locked: boolean;
}) {
  const borderClass = submitted
    ? correct
      ? "border-success"
      : "border-danger"
    : "";

  return (
    <Card className={`mb-3 ${borderClass}`}>
      <CardHeader className="d-flex justify-content-between align-items-center bg-light">
        <div>
          <strong>Question {questionNumber}</strong>
          {question.title && (
            <span className="ms-2 text-muted">- {question.title}</span>
          )}
        </div>
        <div className="d-flex align-items-center gap-2">
          {submitted && (
            <span className={correct ? "text-success" : "text-danger"}>
              {correct ? (
                <>
                  <FaCheck /> Correct
                </>
              ) : (
                <>
                  <FaTimes /> Incorrect
                </>
              )}
            </span>
          )}
          <span>{question.points} pts</span>
        </div>
      </CardHeader>
      <CardBody>
        <div className="mb-3">
          {question.question || "No question text"}
        </div>

        {question.type === "MULTIPLE_CHOICE" && (
          <MultipleChoiceInput
            question={question}
            answer={answer}
            onAnswer={onAnswer}
            submitted={submitted}
            locked={locked}/>
        )}
        {question.type === "TRUE_FALSE" && (
          <TrueFalseInput
            question={question}
            answer={answer}
            onAnswer={onAnswer}
            submitted={submitted}
            locked={locked}/>
        )}
        {question.type === "FILL_IN_BLANK" && (
          <FillInBlankInput
            question={question}
            answer={answer}
            onAnswer={onAnswer}
            submitted={submitted}
            locked={locked}
            correct={correct}/>
        )}
      </CardBody>
    </Card>
  );
}

function MultipleChoiceInput({
  question,
  answer,
  onAnswer,
  submitted,
  locked,
}: any) {
  return (
    <div>
      {(question.choices || []).map((choice: string, i: number) => {
        const isSelected = answer === i;
        const isCorrectChoice = question.correctAnswer === i;

        let labelClass = "";
        if (submitted) {
          if (isCorrectChoice) labelClass = "text-success fw-bold";
          else if (isSelected && !isCorrectChoice) labelClass = "text-danger";
        }

        return (
          <div key={i} className="mb-2">
            <FormCheck
              type="radio"
              id={`q-${question._id}-c-${i}`}
              name={`q-${question._id}`}
              label={
                <span className={labelClass}>
                  {choice}
                  {submitted && isCorrectChoice && (
                    <FaCheck className="ms-2 text-success" />
                  )}
                  {submitted && isSelected && !isCorrectChoice && (
                    <FaTimes className="ms-2 text-danger" />
                  )}
                </span>
              }
              checked={isSelected}
              disabled={locked}
              onChange={() => onAnswer(i)}/>
          </div>
        );
      })}
    </div>
  );
}

function TrueFalseInput({
  question,
  answer,
  onAnswer,
  submitted,
  locked,
}: any) {
  const renderOption = (value: boolean, label: string) => {
    const isSelected = answer === value;
    const isCorrectChoice = question.correctAnswer === value;

    let labelClass = "";
    if (submitted) {
      if (isCorrectChoice) labelClass = "text-success fw-bold";
      else if (isSelected && !isCorrectChoice) labelClass = "text-danger";
    }

    return (
      <FormCheck
        type="radio"
        id={`q-${question._id}-${label}`}
        name={`q-${question._id}`}
        label={
          <span className={labelClass}>
            {label}
            {submitted && isCorrectChoice && (
              <FaCheck className="ms-2 text-success" />
            )}
            {submitted && isSelected && !isCorrectChoice && (
              <FaTimes className="ms-2 text-danger" />
            )}
          </span>
        }
        checked={isSelected}
        disabled={locked}
        onChange={() => onAnswer(value)}/>
    );
  };

  return (
    <div>
      {renderOption(true, "True")}
      {renderOption(false, "False")}
    </div>
  );
}

function FillInBlankInput({
  question,
  answer,
  onAnswer,
  submitted,
  locked,
  correct,
}: any) {
  return (
    <div>
      <FormControl
        type="text"
        value={answer || ""}
        disabled={locked}
        onChange={(e) => onAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className={
          submitted
            ? correct
              ? "border-success"
              : "border-danger"
            : ""
        }/>
      {submitted && !correct && (
        <div className="mt-2 small text-muted">
          <strong>Accepted answers:</strong>{" "}
          {(question.possibleAnswers || []).filter(Boolean).join(", ")}
        </div>
      )}
    </div>
  );
}