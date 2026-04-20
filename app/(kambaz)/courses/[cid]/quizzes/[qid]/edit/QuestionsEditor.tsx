"use client";

import { useState } from "react";
import { Button, Form, Card, FormLabel, FormControl, FormGroup, FormSelect, 
  FormCheck, CardBody, CardHeader, CardFooter} from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

interface Props {
  
}

const QUESTION_TYPES = [
  { value: "MULTIPLE_CHOICE", label: "Multiple Choice" },
  { value: "TRUE_FALSE", label: "True/False" },
  { value: "FILL_IN_BLANK", label: "Fill in the Blank" },
];

const defaultQuestion = (type: string) => {
  const base = {
    _id: uuidv4(),
    type,
    title: "New Question",
    points: 1,
    question: "",
  };
  if (type === "MULTIPLE_CHOICE") {
    return { ...base, choices: ["", "", ""], correctAnswer: 0 };
  }
  if (type === "TRUE_FALSE") {
    return { ...base, correctAnswer: true };
  }
  if (type === "FILL_IN_BLANK") {
    return { ...base, possibleAnswers: [""] };
  }
  return base;
};

export default function QuestionsEditor({quiz, onChange, onSave,onCancel,
}: {
  quiz: any;
  onChange: (quiz: any) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const questions = quiz.questions || [];

  const totalPoints = questions.reduce(
    (sum: number, q: any) => sum + (Number(q.points) || 0),
    0
  );

  const updateQuestion = (q: any) => {
    onChange({
      ...quiz,
      questions: questions.map((x: any) => (x._id === q._id ? q : x)),
    });
  };

  const addQuestion = () => {
    const q = defaultQuestion("MULTIPLE_CHOICE");
    onChange({ ...quiz, questions: [...questions, q] });
    setEditingId(q._id);
  };

  const deleteQuestion = (id: string) => {
    if (!confirm("Delete this question?")) return;
    onChange({
      ...quiz,
      questions: questions.filter((q: any) => q._id !== id),
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Questions ({questions.length})</h4>
        <div>
          <strong>Total Points:</strong> {totalPoints}
        </div>
      </div>

      {questions.length === 0 && (
        <div className="text-center p-5 text-muted border rounded mb-3">
          No questions yet. Click + New Question to add one.
        </div>
      )}

      {questions.map((q: any) =>
        editingId === q._id ? (
          <QuestionEditForm
            key={q._id}
            question={q}
            onTypeChange={(newType) => {
              // Switching type resets shape but keeps title/points/question
              const replaced = {
                ...defaultQuestion(newType),
                _id: q._id,
                title: q.title,
                points: q.points,
                question: q.question,
              };
              updateQuestion(replaced);
            }}
            onSave={(updated) => {
              updateQuestion(updated);
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
            onDelete={() => {
              deleteQuestion(q._id);
              setEditingId(null);
            }}/>
        ) : (
          <QuestionPreview
            key={q._id}
            question={q}
            onEdit={() => setEditingId(q._id)}
            onDelete={() => deleteQuestion(q._id)}/>
        )
      )}

      <div className="text-center my-3">
        <Button variant="outline-secondary" onClick={addQuestion}>
          <FaPlus className="me-2" /> New Question
        </Button>
      </div>

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

function QuestionPreview({
  question,
  onEdit,
  onDelete,
}: {
  question: any;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const typeLabel =
    QUESTION_TYPES.find((t) => t.value === question.type)?.label ||
    question.type;

  return (
    <Card className="mb-3">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <div>
          <strong>{question.title || "Untitled"}</strong>
          <span className="ms-3 text-muted">{typeLabel}</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span>{question.points} pts</span>
          <Button variant="outline-secondary" size="sm" onClick={onEdit}>
            <FaEdit /> Edit
          </Button>
          <Button variant="outline-danger" size="sm" onClick={onDelete}>
            <FaTrash />
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="mb-2">
          {question.question || "No question text"}
        </div>
        {question.type === "MULTIPLE_CHOICE" && (
          <ul className="list-unstyled mb-0">
            {(question.choices || []).map((c: string, i: number) => (
              <li key={i}>
                <input
                  type="radio"
                  disabled
                  checked={question.correctAnswer === i}
                  readOnly
                  className="me-2"/>
                {c || <em>(empty)</em>}
                {question.correctAnswer === i && (
                  <span className="text-success ms-2">correct</span>
                )}
              </li>
            ))}
          </ul>
        )}
        {question.type === "TRUE_FALSE" && (
          <div>
            Correct answer:{" "}
            <strong>{question.correctAnswer ? "True" : "False"}</strong>
          </div>
        )}
        {question.type === "FILL_IN_BLANK" && (
          <div>
            Accepted answers:{" "}
            {(question.possibleAnswers || []).filter(Boolean).join(", ") || (
              <em>none</em>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}

function QuestionEditForm({
  question,
  onTypeChange,
  onSave,
  onCancel,
  onDelete,
}: {
  question: any;
  onTypeChange: (type: string) => void;
  onSave: (q: any) => void;
  onCancel: () => void;
  onDelete: () => void;
}) {
  const [draft, setDraft] = useState<any>({ ...question });

  if (draft._id === question._id && draft.type !== question.type) {
    setDraft({ ...question });
  }

  const set = (field: string, value: any) =>
    setDraft({ ...draft, [field]: value });

  return (
    <Card className="mb-3 border-primary">
      <CardHeader className="bg-light">
        <div className="d-flex gap-3 align-items-center flex-wrap">
          <FormControl
            style={{ maxWidth: "250px" }}
            value={draft.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Question title"/>
          <FormSelect
            style={{ maxWidth: "220px" }}
            value={draft.type}
            onChange={(e) => {
              onTypeChange(e.target.value);
            }}>
            {QUESTION_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </FormSelect>
          <div className="d-flex align-items-center gap-2 ms-auto">
            <FormLabel className="mb-0">Points:</FormLabel>
            <FormControl
              type="number"
              style={{ width: "90px" }}
              value={draft.points}
              min={0}
              onChange={(e) => set("points", Number(e.target.value))}/>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <FormGroup className="mb-3">
          <FormLabel>Question</FormLabel>
          <FormControl
            as="textarea"
            rows={3}
            value={draft.question}
            onChange={(e) => set("question", e.target.value)}
            placeholder="Enter the question text..."/>
        </FormGroup>

        {draft.type === "MULTIPLE_CHOICE" && (
          <MultipleChoiceFields draft={draft} set={set} />
        )}
        {draft.type === "TRUE_FALSE" && (
          <TrueFalseFields draft={draft} set={set} />
        )}
        {draft.type === "FILL_IN_BLANK" && (
          <FillInBlankFields draft={draft} set={set} />
        )}
      </CardBody>
      <CardFooter className="d-flex justify-content-between">
        <Button variant="outline-danger" size="sm" onClick={onDelete}>
          <FaTrash /> Delete Question
        </Button>
        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => onSave(draft)}>
            Update Question
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function MultipleChoiceFields({ draft, set }: { draft: any; set: any }) {
  const choices: string[] = draft.choices || [];

  const updateChoice = (i: number, value: string) => {
    const next = [...choices];
    next[i] = value;
    set("choices", next);
  };

  const addChoice = () => set("choices", [...choices, ""]);

  const removeChoice = (i: number) => {
    const next = choices.filter((_, idx) => idx !== i);
    let nextCorrect = draft.correctAnswer;
    if (i === draft.correctAnswer) nextCorrect = 0;
    else if (i < draft.correctAnswer) nextCorrect = draft.correctAnswer - 1;
    set("choices", next);
    set("correctAnswer", nextCorrect);
  };

  return (
    <div>
      <FormLabel>
        Answers (select correct answer's radio)
      </FormLabel>
      {choices.map((c, i) => (
        <div key={i} className="d-flex align-items-center gap-2 mb-2">
          <FormCheck
            type="radio"
            name={`correct-${draft._id}`}
            checked={draft.correctAnswer === i}
            onChange={() => set("correctAnswer", i)}/>
          <FormControl
            value={c}
            onChange={(e) => updateChoice(i, e.target.value)}
            placeholder={`Choice ${i + 1}`}/>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeChoice(i)}
            disabled={choices.length <= 2}>
            <FaTrash />
          </Button>
        </div>
      ))}
      <Button variant="outline-secondary" size="sm" onClick={addChoice}>
        <FaPlus className="me-1" /> Add Choice
      </Button>
    </div>
  );
}

function TrueFalseFields({ draft, set }: { draft: any; set: any }) {
  return (
    <FormGroup>
      <FormLabel>Correct Answer</FormLabel>
      <div>
        <FormCheck
          type="radio"
          id={`tf-true-${draft._id}`}
          label="True"
          name={`tf-${draft._id}`}
          checked={draft.correctAnswer === true}
          onChange={() => set("correctAnswer", true)}/>
        <FormCheck
          type="radio"
          id={`tf-false-${draft._id}`}
          label="False"
          name={`tf-${draft._id}`}
          checked={draft.correctAnswer === false}
          onChange={() => set("correctAnswer", false)}/>
      </div>
    </FormGroup>
  );
}

function FillInBlankFields({ draft, set }: { draft: any; set: any }) {
  const answers: string[] = draft.possibleAnswers || [];

  const updateAnswer = (i: number, value: string) => {
    const next = [...answers];
    next[i] = value;
    set("possibleAnswers", next);
  };

  const addAnswer = () => set("possibleAnswers", [...answers, ""]);

  const removeAnswer = (i: number) =>
    set(
      "possibleAnswers",
      answers.filter((_, idx) => idx !== i)
    );

  return (
    <div>
      <FormLabel>
        Accepted Answers (case insensitive)
      </FormLabel>
      {answers.map((a, i) => (
        <div key={i} className="d-flex gap-2 mb-2">
          <FormControl
            value={a}
            onChange={(e) => updateAnswer(i, e.target.value)}
            placeholder={`Answer ${i + 1}`}/>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeAnswer(i)}
            disabled={answers.length <= 1}>
            <FaTrash />
          </Button>
        </div>
      ))}
      <Button variant="outline-secondary" size="sm" onClick={addAnswer}>
        <FaPlus className="me-1" /> Add Accepted Answer
      </Button>
    </div>
  );
}