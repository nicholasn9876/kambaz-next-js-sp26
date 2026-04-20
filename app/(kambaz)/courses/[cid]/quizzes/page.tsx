"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ListGroup, ListGroupItem, FormControl, Button, InputGroup,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaRocket, FaCheckCircle } from "react-icons/fa";
import { FaPlus, FaBan } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoEllipsisVertical } from "react-icons/io5";
import InputGroupText from "react-bootstrap/InputGroupText";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as client from "./client";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducer";
import { RootState } from "../../../store";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  if (!currentUser) return <div>Not logged in.</div>;

  const fetchQuizzes = async () => {
    const data = await client.findQuizzesForCourse(cid as string);
    if (isStudent) {
      for (const quiz of data) {
        const latestAttempt = await client.findLatestAttempt(quiz._id);
        if (latestAttempt) {
          quiz.lastScore = latestAttempt.score;
        }
      }
    }
    dispatch(setQuizzes(data));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm("Delete this quiz?")) return;
    await client.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const togglePublish = async (quiz: any) => {
    const updated = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
  };

  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuizForCourse(cid as string, {
      title: "New Quiz",
    });
    dispatch(setQuizzes([...quizzes, newQuiz]));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/edit`);
  };

  const fmt = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const getAvailability = (quiz: any) => {
    if (!quiz.availableDate) return { label: "No availability set", bold: false };
    const now = new Date();
    const available = new Date(quiz.availableDate);
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (until && now > until) return { label: "Closed", bold: true };
    if (now < available)
      return { label: `Not available until ${fmt.format(available)}`, bold: true };
    return { label: "Available", bold: true };
  };

  const hasPerms = ["FACULTY", "ADMIN"].includes(currentUser.role);
  const isStudent = currentUser.role === "STUDENT";

  return (
    <div id="wd-quizzes">
      <div id="wd-quizzes-topbar" className="text-nowrap d-flex justify-content-between">
        <InputGroup className="float-start ms-1 w-50">
          <InputGroupText className="bg-white border-end-0">
            <CiSearch />
          </InputGroupText>
          <FormControl
            className="border-start-0"
            id="wd-quiz-search-field"
            placeholder="Search..."
          />
        </InputGroup>
        {hasPerms && (
          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            id="wd-add-quiz-btn"
            onClick={handleAddQuiz}
          >
            <FaPlus className="position-relative me-1" style={{ bottom: "1px" }} /> Quiz
          </Button>
        )}
      </div>
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-assignment-groups">
        <ListGroupItem className="wd-quiz-group p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Assignment Quizzes
          </div>

          {quizzes.length === 0 ? (
            <div className="p-4 text-center text-muted">
              No quizzes yet. Click the <strong>+ Quiz</strong> button to add one.
            </div>
          ) : (
            <ListGroup className="wd-quizzes rounded-0">
              {quizzes.map((quiz: any) => {
                const availability = getAvailability(quiz);
                const questionCount = (quiz.questions || []).length;
                const totalPoints =
                  quiz.points ??
                  (quiz.questions || []).reduce(
                    (sum: number, q: any) => sum + (q.points || 0),
                    0
                  );

                return (
                  <ListGroupItem key={quiz._id} className="wd-quiz p-3 ps-1">
                    <div className="d-flex">
                      <div className="text-nowrap">
                        <BsGripVertical className="me-2 fs-3" />
                        <FaRocket className="me-2 fs-5 text-success" />
                      </div>
                      <div className="flex-fill me-auto">
                        <Link
                          className="text-decoration-none text-dark"
                          href={`/courses/${cid}/quizzes/${quiz._id}`}>
                          <span className="fw-bold fs-5">{quiz.title}</span>
                        </Link>
                        <div className="fs-6 text-muted mt-1">
                          <span className={availability.bold ? "fw-bold text-dark" : ""}>
                            {availability.label}
                          </span>
                          {quiz.dueDate && (
                            <>
                              <span className="mx-2">|</span>
                              <span>
                                <strong>Due</strong> {fmt.format(new Date(quiz.dueDate))}
                              </span>
                            </>
                          )}
                          <span className="mx-2">|</span>
                          <span>{totalPoints} pts</span>
                          <span className="mx-2">|</span>
                          <span>
                            {questionCount} {questionCount === 1 ? "Question" : "Questions"}
                          </span>
                          {isStudent && quiz.lastScore !== undefined && (
                            <>
                              <span className="mx-2">|</span>
                              <span>
                                <strong>Score:</strong> {quiz.lastScore}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {hasPerms && (
                        <div className="d-flex align-items-center gap-2">
                          {quiz.published ? (
                            <FaCheckCircle
                              className="text-success fs-5"
                              style={{ cursor: "pointer" }}
                              onClick={() => togglePublish(quiz)}/>
                          ) : (
                            <FaBan
                              className="text-danger fs-5"
                              style={{ cursor: "pointer" }}
                              onClick={() => togglePublish(quiz)}/>
                          )}
                          <Dropdown>
                            <DropdownToggle as="span" id="wd-quiz-context-menu" style={{ cursor: "pointer" }}>
                              <IoEllipsisVertical />
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem href={`/courses/${cid}/quizzes/${quiz._id}/edit`}>
                                Edit
                              </DropdownItem>
                              <DropdownItem onClick={() => handleDeleteQuiz(quiz._id)}>
                                Delete
                              </DropdownItem>
                              <DropdownItem onClick={() => togglePublish(quiz)}>
                                {quiz.published ? "Unpublish" : "Publish"}
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      )}
                    </div>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          )}
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}