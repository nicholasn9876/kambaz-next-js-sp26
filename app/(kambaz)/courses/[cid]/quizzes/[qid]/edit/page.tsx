"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Nav, Tab, NavLink, NavItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FaBan, FaCheckCircle } from "react-icons/fa";

import * as client from "../../client";
import { updateQuiz as updateQuizAction } from "../../reducer";
import DetailsEditor from "./DetailsEditor";
import QuestionsEditor from "./QuestionsEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"details" | "questions">("details");
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
      setLoading(false);
    };
  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  const totalPoints = (quiz?.questions || []).reduce(
    (sum: number, q: any) => sum + (Number(q.points) || 0),
    0
  );

  const persist = async (updated: any) => {
    const withPoints = {
      ...updated,
      points: (updated.questions || []).reduce(
        (s: number, q: any) => s + (Number(q.points) || 0),
        0
      ),
    };
    await client.updateQuiz(withPoints);
    dispatch(updateQuizAction(withPoints));
    setQuiz(withPoints);
    return withPoints;
  };

  const handleSave = async () => {
    await persist(quiz);
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    await persist({ ...quiz, published: true });
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!quiz) return <div className="p-4">Quiz not found.</div>;

  return (
    <div id="wd-quiz-editor" className="p-3">
      <div className="d-flex justify-content-end align-items-center gap-3 mb-2">
        <span>
          <strong>Points</strong> {totalPoints}
        </span>
        {quiz.published ? (
          <span className="text-success">
            <FaCheckCircle /> Published
          </span>
        ) : (
          <span className="text-muted">
            <FaBan /> Not Published
          </span>
        )}
      </div>
      <hr />

      <Tab.Container
        activeKey={activeTab}
        onSelect={(k) => setActiveTab((k as "details" | "questions") || "details")}
      >
        <Nav variant="tabs" className="mb-3">
          <NavItem>
            <NavLink eventKey="details">Details</NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey="questions">Questions</NavLink>
          </NavItem>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="details">
            <DetailsEditor
              quiz={quiz}
              onChange={setQuiz}
              onSave={handleSave}
              onSaveAndPublish={handleSaveAndPublish}
              onCancel={handleCancel}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="questions">
            <QuestionsEditor
              quiz={quiz}
              onChange={setQuiz}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}