import { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline, IoMdInformationCircleOutline } from "react-icons/io";
import { LiaTimesCircle } from "react-icons/lia";
import { NavLink, useNavigate } from "react-router-dom";
import type { AnswerStatus, AnswerType, Question } from "../types";
import { Button } from "./components";
import { useQuiz } from "./context";
import Layout from "./Layout";
import { ScoreUtils } from "./lib/helpers";
import "./styles/pages/test.scss";

export default function Test() {
  const { quiz, topic, saveQuiz, retakeQuiz } = useQuiz();
  const navigate = useNavigate();

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<Question["answer"] | null>(null);

  const quesNumber = questionIndex + 1;
  const question = quiz?.questions[questionIndex];
  const totalQuestions = quiz?.questions.length || 0;

  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showAns, setShowAns] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!quiz) navigate("/");

    setTimeSpent(0);
    setStarted(true);
  }, [quiz, navigate]);

  useEffect(() => {
    setInterval(() => setTimeSpent((t) => t + 1), 1000);
  }, [started]);

  useEffect(() => {
    if (quesNumber >= totalQuestions) completeTest();
  }, [quesNumber]);

  const pickAnswer = (a: AnswerType) => setAnswer(a);
  const submitAns = () => setShowAns(true);

  function nextQuestion() {
    if (answer == question?.answer) setScore((t) => t + 1);
    setAnswer(null);
    setShowAns(false);
    setQuestionIndex((t) => t + 1);
  }

  function completeTest() {
    saveQuiz(timeSpent, score);
    setCompleted(true);
  }

  function startOver() {
    const allow = retakeQuiz(quiz || "");
    if (!allow) return;

    setStarted(false);
    setScore(0);
    setCompleted(false);
    setQuestionIndex(0);
    setShowAns(false);
  }

  return (
    <Layout>
      <div className="test">
        {!completed && <TestProgress current={quesNumber} total={totalQuestions} topic={quiz?.topic || topic} />}

        {question && !completed && !showAns && <TestQuestion question={question} answer={answer} pickAnswer={pickAnswer} submit={submitAns} />}
        {question && !completed && showAns && (
          <TestAnswer question={question} answer={answer} next={nextQuestion} isFinal={quesNumber == totalQuestions} />
        )}

        {completed && <TestComplete score={score} total={totalQuestions} restart={startOver} />}
      </div>
    </Layout>
  );
}

type TestQProps = { question?: Question; pickAnswer?: (...a: any[]) => void; answer?: AnswerType; submit: () => void };

function TestQuestion({ question, pickAnswer, answer, submit }: TestQProps) {
  if (!question) return;
  const options = question.options;

  return (
    <>
      <div className="test-question">
        <h2>{question.question}</h2>
      </div>

      <div className="test-options">
        {Object.keys(options).map((key) => (
          <AnswerOption
            key={key}
            option={key.toUpperCase()}
            value={options[key as keyof typeof options]}
            selector={() => pickAnswer?.(key)}
            status={answer == key ? "selected" : "none"}
          />
        ))}
      </div>

      <div className="test-next-button right-items">
        <Button text="Answer" disabled={!answer} onClick={submit} />
      </div>
    </>
  );
}

function TestAnswer({ question, answer, isFinal = false, next }: { question?: Question; answer?: AnswerType; next(): void; isFinal?: boolean }) {
  if (!question) return;
  const options = question.options;

  return (
    <>
      <div className="test-question">
        <h2>{question.question}</h2>
      </div>

      <div className="test-options">
        {Object.keys(options).map((key) => {
          let status: AnswerStatus = "none";
          if (key == answer) status = "selected";
          if (key == question.answer) status = "correct";
          if (key !== question.answer && key == answer) status = "wrong";

          return <AnswerOption key={key} option={key.toUpperCase()} value={options[key as keyof typeof options]} status={status} />;
        })}
      </div>

      <div className="test-answer">
        <div className="test-answer-head">
          <span className="test-answer-head-icon">
            <IoMdInformationCircleOutline />{" "}
          </span>
          <span>Explanation</span>
        </div>
        <p>{question.explanation}</p>
      </div>

      <div className="test-next-button right-items">
        <Button text={isFinal ? "View Results" : "Next Question"} onClick={next} />
      </div>
    </>
  );
}

function TestComplete({ score, total, restart }: { score: number; total: number; restart(): void }) {
  const percentage = (score / total) * 100;
  const utl = new ScoreUtils(percentage);

  return (
    <>
      <div className="test-complete">
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Quiz Complete</h1>
        <p className="cl-text" style={{ textAlign: "center" }}>
          {utl.message} Review your metrics below or challenge yourself again to optimize your record.
        </p>
      </div>

      <div className="test-results">
        <div className="test-results-left">
          <Score score={score} max={total} />
        </div>
        <div className="test-results-right">
          <div className="left-items">
            <span className="tag tag-indigo">{percentage}% Score</span> <span className={`tag tag-${utl.color}`}>{utl.status}</span>{" "}
          </div>
          <h2>{utl.feedback}</h2>
          <p className="cl-text">{utl.comment}</p>
        </div>
      </div>

      <div className="test-complete-buttons center-item">
        <Button text="Retake Test" onClick={restart} />
        <NavLink to={"/"}>
          <Button text="Back to Home" color="none" />
        </NavLink>
      </div>
    </>
  );
}

function TestProgress({ current, total, topic }: { current: number; total: number; topic?: string | null }) {
  return (
    <div className="test-progress">
      <div className="separate-items test-progress-head">
        <p className="test-progress-count">
          QUESTION {current} OF {total}
        </p>
        <p className="test-topic">{topic?.toUpperCase()}</p>
      </div>

      <div className="progress">
        <div className="progress__bar" style={{ "--progress": `${current * 10}%` } as any} />
      </div>
    </div>
  );
}

function AnswerOption({
  option,
  value,
  status = "none",
  selector,
}: {
  option: string;
  value: string | number;
  status?: AnswerStatus;
  selector?: (...a: any[]) => void;
}) {
  return (
    <div className={`option ${status}`} onClick={selector}>
      <div className="option-code">{option}</div>
      <p className="option-value">{value}</p>
      {(status == "correct" || status == "wrong") && (
        <span className="option-icon">
          {status == "wrong" && <LiaTimesCircle />}
          {status == "correct" && <IoMdCheckmarkCircleOutline />}
        </span>
      )}
    </div>
  );
}

function Score({ score = 7, max = 10 }: { score?: number; max?: number }) {
  const percentage = (score / max) * 100;

  return (
    <div className="score" style={{ "--score": `${percentage}%` } as any} role="img" aria-label={`Score: ${score} out of ${max}`}>
      <div className="score__content">
        <div className="score__value">
          {score}/{max}
        </div>

        <div className="score__label">Score</div>
      </div>
    </div>
  );
}
