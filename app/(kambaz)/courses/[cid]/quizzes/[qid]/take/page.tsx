"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Alert, CardBody, CardHeader,
  FormCheck, FormControl } from "react-bootstrap";
import { FaCheck, FaTimes, FaArrowLeft, FaArrowRight, FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [quiz, setQuiz] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [accessCodeInput, setAccessCodeInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);

  const [viewingAttempt, setViewingAttempt] = useState<any | null>(null);

  useEffect(() => {
    const load = async () => {
      const [quizData, attemptData] = await Promise.all([
        client.findQuizById(qid as string),
        client.findAttemptsForQuiz(qid as string).catch(() => []),
      ]);
      setQuiz(quizData);
      setAttempts(attemptData || []);

      if (attemptData && attemptData.length > 0) {
        setViewingAttempt(attemptData[attemptData.length - 1]);
      }
      setLoading(false);
    };
    load();
  }, [qid]);

  if (!currentUser) return <div>Not logged in.</div>;
  if (loading) return <div className="p-4">Loading...</div>;
  if (!quiz) return <div className="p-4">Quiz not found.</div>;

  // Availability checks
  if (!quiz.published) {
  return (
    <div className="p-3">
      <Alert variant="warning">This quiz is not published.</Alert>
      <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
        Back to Quizzes
      </Button>
    </div>
  );
}

  const now = new Date();
  const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
  const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

  if (availableDate && now < availableDate) {
    return (
      <div className="p-3">
        <Alert variant="info">
          This quiz is not available until {availableDate.toLocaleString()}.
        </Alert>
        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  if (untilDate && now > untilDate && !viewingAttempt) {
    return (
      <div className="p-3">
        <Alert variant="warning">This quiz is closed.</Alert>
        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  const questions: any[] = quiz.questions || [];
  const totalPoints = questions.reduce(
    (sum, q) => sum + (Number(q.points) || 0),
    0
  );

  const maxAttempts = quiz.multipleAttempts ? (quiz.howManyAttempts ?? 1) : 1;
  const attemptsUsed = attempts.length;
  const attemptsRemaining = Math.max(0, maxAttempts - attemptsUsed);

  const oneAtATime = !!quiz.oneQuestionAtATime;

  // Access code
  const needsAccessCode = quiz.accessCode && quiz.accessCode.length > 0;
  const codeRequired = needsAccessCode && !accessGranted && !viewingAttempt;

  const setAnswer = (qid: string, value: any) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const handleSubmit = async () => {
    if (!confirm("Submit your quiz? You won't be able to change your answers after this.")) {
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const answersPayload = questions.map((q) => ({
        questionId: q._id,
        answer: answers[q._id],
      }));
      const newAttempt = await client.submitAttempt(qid as string, answersPayload);
      setAttempts([...attempts, newAttempt]);
      setViewingAttempt(newAttempt);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      setError(
        e?.response?.data?.error || "Failed to submit quiz. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const startNewAttempt = () => {
    if (attemptsRemaining <= 0) return;
    setAnswers({});
    setCurrentIdx(0);
    setViewingAttempt(null);
    setAccessGranted(!needsAccessCode);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAccessCodeSubmit = () => {
    if (accessCodeInput === quiz.accessCode) {
      setAccessGranted(true);
      setError(null);
    } else {
      setError("Incorrect access code.");
    }
  };

  // past attempt
  if (viewingAttempt) {
    const attemptAnswersMap: Record<string, any> = {};
    (viewingAttempt.answers || []).forEach((a: any) => {
      attemptAnswersMap[a.questionId] = a;
    });

    return (
      <div id="wd-take-quiz" className="p-3">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h2 className="mb-1">{quiz.title}</h2>
            <div className="text-muted small">
              Attempt {viewingAttempt.attemptNumber} of {maxAttempts} ·
              Submitted {new Date(viewingAttempt.submittedAt).toLocaleString()}
            </div>
          </div>
          <div className="text-end">
            <div className="fs-4">
              <strong className="text-success">{viewingAttempt.score}</strong>
              <span className="text-muted"> / {totalPoints}</span>
            </div>
            <div className="text-muted small">
              {totalPoints > 0
                ? Math.round((viewingAttempt.score / totalPoints) * 100)
                : 0}
              %
            </div>
          </div>
        </div>

        <Alert variant="info">
          <strong>Viewing your last attempt.</strong> Answers are locked.
          {attemptsRemaining > 0 && (
            <> You have {attemptsRemaining} attempt{attemptsRemaining !== 1 && "s"} remaining.</>
          )}
          {attemptsRemaining === 0 && <> You have no attempts remaining.</>}
        </Alert>

        {quiz.description && (
          <div className="mb-4 p-3 bg-light rounded">{quiz.description}</div>
        )}

        {questions.map((q, i) => {
          const record = attemptAnswersMap[q._id];
          let storedAnswer;
          if (q.type === "MULTIPLE_CHOICE") storedAnswer = record?.mcAnswer;
          else if (q.type === "TRUE_FALSE") storedAnswer = record?.tfAnswer;
          else if (q.type === "FILL_IN_BLANK") storedAnswer = record?.fillBlankAnswer;
          const wasCorrect = !!record?.correct;
          return (
            <QuestionCard
              key={q._id}
              question={q}
              questionNumber={i + 1}
              answer={storedAnswer}
              onAnswer={() => {}}
              submitted={true}
              correct={wasCorrect}
              locked={true}
              showCorrectAnswers={shouldShowCorrectAnswers(quiz)}/>
          );
        })}

        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
            Back to Quizzes
          </Button>
          {attemptsRemaining > 0 && (
            <Button variant="danger" onClick={startNewAttempt}>
              Take Quiz Again ({attemptsRemaining} left)
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (codeRequired) {
    return (
      <div id="wd-take-quiz" className="p-3" style={{ maxWidth: "500px" }}>
        <h2>{quiz.title}</h2>
        <Alert variant="warning">
          <FaLock className="me-2" />
          This quiz requires an access code.
        </Alert>
        <FormControl
          type="password"
          placeholder="Enter access code"
          value={accessCodeInput}
          onChange={(e) => setAccessCodeInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAccessCodeSubmit()}
          className="mb-2"/>
        {error && <div className="text-danger mb-2 small">{error}</div>}
        <div className="d-flex gap-2">
          <Button variant="danger" onClick={handleAccessCodeSubmit}>
            Submit Code
          </Button>
          <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  if (attemptsRemaining === 0) {
    return (
      <div className="p-3">
        <Alert variant="warning">
          You have used all {maxAttempts} attempt{maxAttempts !== 1 && "s"} for this quiz.
        </Alert>
        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
          Back to Quizzes
        </Button>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== ""
  ).length;

  const questionsToShow = oneAtATime ? [questions[currentIdx]] : questions;

  return (
    <div id="wd-take-quiz" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">{quiz.title}</h2>
          <div className="text-muted small">
            Attempt {attemptsUsed + 1} of {maxAttempts}
            {quiz.timeLimit > 0 && <> · Time limit: {quiz.timeLimit} minutes</>}
          </div>
        </div>
        <div className="text-end">
          <div>
            <strong>{totalPoints}</strong> points
          </div>
          <div className="text-muted small">
            {questions.length} {questions.length === 1 ? "question" : "questions"}
          </div>
        </div>
      </div>

      {quiz.description && (
        <div className="mb-4 p-3 bg-light rounded">{quiz.description}</div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {questions.length === 0 && (
        <div className="text-center p-5 text-muted border rounded">
          This quiz has no questions.
        </div>
      )}

      {questions.length > 0 && (
        <>
          {oneAtATime && (
            <div className="mb-3 text-muted small">
              Question {currentIdx + 1} of {questions.length} · {answeredCount} answered
            </div>
          )}

          {questionsToShow.map((q, displayIdx) => {
            const questionNumber = oneAtATime ? currentIdx + 1 : displayIdx + 1;
            return (
              <QuestionCard
                key={q._id}
                question={q}
                questionNumber={questionNumber}
                answer={answers[q._id]}
                onAnswer={(v) => setAnswer(q._id, v)}
                submitted={false}
                correct={false}
                locked={false}
                showCorrectAnswers={false}/>
            );
          })}

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
                  <Button variant="danger" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Quiz"}
                  </Button>
                )}
              </>
            ) : (
              <>
                <div />
                <Button variant="danger" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Quiz"}
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function shouldShowCorrectAnswers(quiz: any): boolean {
  const setting = quiz.showCorrectAnswers || "Immediately";
  if (setting === "Never") return false;
  if (setting === "Immediately" || setting === "After Student Submits") return true;
  if (setting === "After Due Date") {
    if (!quiz.dueDate) return true;
    return new Date() > new Date(quiz.dueDate);
  }
  return true;
}

function QuestionCard({
  question,
  questionNumber,
  answer,
  onAnswer,
  submitted,
  correct,
  locked,
  showCorrectAnswers,
}: {
  question: any;
  questionNumber: number;
  answer: any;
  onAnswer: (v: any) => void;
  submitted: boolean;
  correct: boolean;
  locked: boolean;
  showCorrectAnswers: boolean;
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
              {correct ? (<><FaCheck /> Correct</>) : (<><FaTimes /> Incorrect</>)}
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
            locked={locked}
            showCorrectAnswers={showCorrectAnswers}/>
        )}
        {question.type === "TRUE_FALSE" && (
          <TrueFalseInput
            question={question}
            answer={answer}
            onAnswer={onAnswer}
            submitted={submitted}
            locked={locked}
            showCorrectAnswers={showCorrectAnswers}/>
        )}
        {question.type === "FILL_IN_BLANK" && (
          <FillInBlankInput
            question={question}
            answer={answer}
            onAnswer={onAnswer}
            submitted={submitted}
            locked={locked}
            correct={correct}
            showCorrectAnswers={showCorrectAnswers}/>
        )}
      </CardBody>
    </Card>
  );
}

function MultipleChoiceInput({
  question, answer, onAnswer, submitted, locked, showCorrectAnswers,
}: any) {
  return (
    <div>
      {(question.choices || []).map((choice: string, i: number) => {
        const isSelected = answer === i;
        const isCorrectChoice = question.correctAnswer === i;

        let labelClass = "";
        if (submitted && showCorrectAnswers) {
          if (isCorrectChoice) labelClass = "text-success fw-bold";
          else if (isSelected && !isCorrectChoice) labelClass = "text-danger";
        } else if (submitted && isSelected) {
          labelClass = "fw-bold";
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
                  {submitted && showCorrectAnswers && isCorrectChoice && (
                    <FaCheck className="ms-2 text-success" />
                  )}
                  {submitted && showCorrectAnswers && isSelected && !isCorrectChoice && (
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
  question, answer, onAnswer, submitted, locked, showCorrectAnswers,
}: any) {
  const renderOption = (value: boolean, label: string) => {
    const isSelected = answer === value;
    const isCorrectChoice = question.correctAnswer === value;

    let labelClass = "";
    if (submitted && showCorrectAnswers) {
      if (isCorrectChoice) labelClass = "text-success fw-bold";
      else if (isSelected && !isCorrectChoice) labelClass = "text-danger";
    } else if (submitted && isSelected) {
      labelClass = "fw-bold";
    }

    return (
      <FormCheck
        type="radio"
        id={`q-${question._id}-${label}`}
        name={`q-${question._id}`}
        label={
          <span className={labelClass}>
            {label}
            {submitted && showCorrectAnswers && isCorrectChoice && (
              <FaCheck className="ms-2 text-success" />
            )}
            {submitted && showCorrectAnswers && isSelected && !isCorrectChoice && (
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
  question, answer, onAnswer, submitted, locked, correct, showCorrectAnswers,
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
      {submitted && !correct && showCorrectAnswers && (
        <div className="mt-2 small text-muted">
          <strong>Accepted answers:</strong>{" "}
          {(question.possibleAnswers || []).filter(Boolean).join(", ")}
        </div>
      )}
    </div>
  );
}