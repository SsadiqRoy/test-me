import { useState } from "react";
import type { Quiz } from "../types";
import { Return } from "./components";
import { useQuiz } from "./context";
import Layout from "./Layout";
import { getRelativeDate, ScoreUtils } from "./lib/helpers";
import "./styles/pages/past.scss";
import { useNavigate } from "react-router-dom";

export default function Past() {
  const { quizManager } = useQuiz();
  // const quizes = quizManager.getQuizes();
  const [quizes, setQuizes] = useState<Quiz[]>(quizManager.getQuizes());

  function clearQuizes() {
    quizManager.clear();
    setQuizes(quizManager.getQuizes());
    // if (!cleared) return;
  }

  return (
    <Layout>
      <div className="past">
        <Return to="/" text="Back to Home" />
        <h1 style={{ marginBlock: "2rem" }}>Your Past Tests</h1>
        <p className="cl-text">Review your historical scores, identify learning gaps, and seamlessly restart any module to break your high scores.</p>

        <div className="past-tests">
          {quizes.map((quiz) => (
            <PastTest key={quiz.id} quiz={quiz} />
          ))}

          {quizes.length < 1 && (
            <div className="no-quizes" style={{ textAlign: "center" }}>
              <h2>You have not taken any test yet</h2>
            </div>
          )}

          {quizes.length > 0 && (
            <div className="separate-items" style={{ marginTop: "2rem", fontSize: "1.2rem" }}>
              <p className="cl-text">Showing {quizes.length} completed assesments</p>

              <p className="cl-text text-link" onClick={clearQuizes}>
                Clear All Tests
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function PastTest({ quiz }: { quiz: Quiz }) {
  const percentage = (quiz.score / quiz.questions.length) * 100;
  const utl = new ScoreUtils(percentage);

  const { retakeQuiz } = useQuiz();
  const navigate = useNavigate();

  function retake() {
    const allow = retakeQuiz(quiz || "");
    if (!allow) return;
    navigate("/test");
  }

  return (
    <div className="past-test">
      <div className="past-test-left">
        <div className={`past-test-percentage tag-${utl.color}`}>{percentage}%</div>
        <div className="past-test-topic">
          <strong style={{ textTransform: "capitalize" }}>{quiz.topic}</strong>
          <div className="left-items">
            {(quiz.attempts < 2 || !quiz.attempts) && <p className="cl-text">{getRelativeDate(quiz.lastAttemptAt)}</p>}
            {quiz.attempts > 1 && <p className="cl-text">Last taken {getRelativeDate(quiz.lastAttemptAt)}</p>}
            {quiz.attempts > 1 && <p className="cl-text">{quiz.attempts} attempts</p>}
          </div>
        </div>
      </div>
      <div className="past-test-right">
        <div className="past-test-score">
          {quiz.score}/{quiz.questions.length}
        </div>
        <div className="retake-btn" onClick={retake}>
          Retake
        </div>
      </div>
    </div>
  );
}
