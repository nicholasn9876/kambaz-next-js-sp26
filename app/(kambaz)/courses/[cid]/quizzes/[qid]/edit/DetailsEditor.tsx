"use client";

import { Button, Form, Row, Col, FormLabel, 
  FormControl, FormGroup, FormSelect, FormCheck } from "react-bootstrap";

export default function DetailsEditor({quiz, onChange, onSave, onSaveAndPublish, onCancel,
}: {
  quiz: any;
  onChange: (quiz: any) => void; // setQuiz
  onSave: () => void; // handleSave
  onSaveAndPublish: () => void; // handleSaveAndPublish
  onCancel: () => void; // handleCancel
}) {
  const set = (field: string, value: any) => {
    onChange({ ...quiz, [field]: value });
  }

  const toDateInput = (v: string | undefined) => {
    if (!v) return "";
    const d = new Date(v);
    if (isNaN(d.getTime())) return "";
    // yyyy-MM-ddTHH:mm for <input type="datetime-local">
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  return (
    <Form>
      <FormGroup className="mb-3">
        <FormLabel>Quiz Title</FormLabel>
        <FormControl
          value={quiz.title || ""}
          onChange={(e) => set("title", e.target.value)}/>
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Quiz Instructions</FormLabel>
        <FormControl
          as="textarea"
          rows={5}
          value={quiz.description || ""}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Enter quiz instructions..."/>
      </FormGroup>

      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Quiz Type
        </FormLabel>
        <Col sm={6}>
          <FormSelect
            value={quiz.quizType || "Graded Quiz"}
            onChange={(e) => set("quizType", e.target.value)}>
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Assignment Group
        </FormLabel>
        <Col sm={6}>
          <FormSelect
            value={quiz.assignmentGroup || "Quizzes"}
            onChange={(e) => set("assignmentGroup", e.target.value)}>
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Assignments</option>
            <option>Project</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col sm={{ span: 6, offset: 3 }}>
          <h5>Options</h5>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col sm={{ span: 6, offset: 3 }}>
          <FormCheck
            type="checkbox"
            label="Shuffle Answers"
            checked={!!quiz.shuffleAnswers}
            onChange={(e) => set("shuffleAnswers", e.target.checked)}/>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col sm={{ span: 6, offset: 3 }}>
          <div className="d-flex align-items-center gap-2">
            <FormCheck
              type="checkbox"
              label="Time Limit"
              checked={quiz.timeLimit != null && quiz.timeLimit !== 0}
              onChange={(e) =>
                set("timeLimit", e.target.checked ? 20 : 0)
              }/>
            <FormControl
              type="number"
              style={{ width: "90px" }}
              value={quiz.timeLimit ?? 20}
              min={0}
              onChange={(e) => set("timeLimit", Number(e.target.value))}/>
            <span>Minutes</span>
          </div>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col sm={{ span: 6, offset: 3 }}>
          <FormCheck
            type="checkbox"
            label="Allow Multiple Attempts"
            checked={!!quiz.multipleAttempts}
            onChange={(e) => set("multipleAttempts", e.target.checked)}/>
        </Col>
      </Row>

      {quiz.multipleAttempts && (
        <Row className="mb-2">
          <Col sm={{ span: 6, offset: 3 }}>
            <div className="d-flex align-items-center gap-2">
              <FormLabel className="mb-0">How Many Attempts</FormLabel>
              <FormControl
                type="number"
                style={{ width: "90px" }}
                value={quiz.howManyAttempts ?? 1}
                min={1}
                onChange={(e) =>
                  set("howManyAttempts", Number(e.target.value))
                }/>
            </div>
          </Col>
        </Row>
      )}

      <Row className="mb-2">
        <FormLabel column sm={3} className="text-end">
          Show Correct Answers
        </FormLabel>
        <Col sm={6}>
          <FormSelect
            value={quiz.showCorrectAnswers || "Immediately"}
            onChange={(e) => set("showCorrectAnswers", e.target.value)}>
            <option>Immediately</option>
            <option>After Due Date</option>
            <option>After Student Submits</option>
            <option>Never</option>
          </FormSelect>
        </Col>
      </Row>

      <Row className="mb-2">
        <FormLabel column sm={3} className="text-end">
          Access Code
        </FormLabel>
        <Col sm={6}>
          <FormControl
            type="text"
            value={quiz.accessCode || ""}
            onChange={(e) => set("accessCode", e.target.value)}
            placeholder="(blank for no code)"/>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col sm={{ span: 6, offset: 3 }}>
          <FormCheck
            type="checkbox"
            label="One Question at a Time"
            checked={!!quiz.oneQuestionAtATime}
            onChange={(e) => set("oneQuestionAtATime", e.target.checked)}/>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col sm={{ span: 6, offset: 3 }}>
          <FormCheck
            type="checkbox"
            label="Webcam Required"
            checked={!!quiz.webcamRequired}
            onChange={(e) => set("webcamRequired", e.target.checked)}/>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col sm={{ span: 6, offset: 3 }}>
          <FormCheck
            type="checkbox"
            label="Lock Questions After Answering"
            checked={!!quiz.lockQuestionsAfterAnswering}
            onChange={(e) =>
              set("lockQuestionsAfterAnswering", e.target.checked)
            }/>
        </Col>
      </Row>

      <div
        className="border rounded p-3 mb-3"
        style={{ backgroundColor: "#f8f9fa" }}>
        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Due
          </FormLabel>
          <Col sm={6}>
            <FormControl
              type="datetime-local"
              value={toDateInput(quiz.dueDate)}
              onChange={(e) => set("dueDate", e.target.value)}/>
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Available from
          </FormLabel>
          <Col sm={6}>
            <FormControl
              type="datetime-local"
              value={toDateInput(quiz.availableDate)}
              onChange={(e) => set("availableDate", e.target.value)}/>
          </Col>
        </Row>
        <Row className="mb-0">
          <FormLabel column sm={3} className="text-end">
            Until
          </FormLabel>
          <Col sm={6}>
            <FormControl
              type="datetime-local"
              value={toDateInput(quiz.untilDate)}
              onChange={(e) => set("untilDate", e.target.value)}/>
          </Col>
        </Row>
      </div>

      <hr/>
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onSave}>
          Save
        </Button>
        <Button variant="success" onClick={onSaveAndPublish}>
          Save and Publish
        </Button>
      </div>
    </Form>
  );
}