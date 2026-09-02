import { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline, IoMdInformationCircleOutline } from "react-icons/io";
import { LiaTimesCircle } from "react-icons/lia";
import { NavLink, useNavigate } from "react-router-dom";
import type { AnswerStatus, AnswerType, Question } from "../types";
import { Button } from "./components";
import { useQuiz } from "./context";
import Layout from "./Layout";
import "./styles/pages/test.scss";

export default function Test() {
  const { quiz, topic } = useQuiz();
  const navigate = useNavigate();

  const [quesNumber, setQuesNumber] = useState<number>(0);
  const [answer, setAnswer] = useState<Question["answer"] | null>(null);

  const question = quiz?.questions[quesNumber];
  // const [question, setQuestion] = useState<Question | null>(quiz?.questions[quesNumber] || null);

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

  // useEffect(() => {
  //   setInterval(() => setTimeSpent((t) => t + 1), 1000);
  // }, [started]);

  const pickAnswer = (a: AnswerType) => setAnswer(a);
  const submitAns = () => setShowAns(true);

  function nextQuestion() {
    if (answer == question?.answer) setScore((t) => t + 1);
    setAnswer(null);
    setShowAns(false);
    if (quesNumber < (quiz?.questions.length || 0) - 1) setQuesNumber((t) => t + 1);
  }

  const onTest = completed || showAns;

  return (
    <Layout>
      <div className="test">
        <TestProgress current={quesNumber + 1} total={quiz?.questions.length || 0} topic={topic} />

        {question && !onTest && <TestQuestion question={question} answer={answer} pickAnswer={pickAnswer} submit={submitAns} />}
        {question && onTest && <TestAnswer question={question} answer={answer} next={nextQuestion} />}
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
function TestAnswer({ question, answer, next }: { question?: Question; answer?: AnswerType; next(): void }) {
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
        <Button text="Next Question" onClick={next} />
      </div>
    </>
  );
}

function TestComplete() {
  return (
    <>
      <div className="test-complete">
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Quiz Complete</h1>
        <p className="cl-text" style={{ textAlign: "center" }}>
          Excellent effort! Review your metrics below or challenge yourself again to optimize your record.
        </p>
      </div>

      <div className="test-results">
        <div className="test-results-left">
          <Score />
        </div>
        <div className="test-results-right">
          <div className="left-items">
            <span className="tag tag-indigo">70% Score</span> <span className="tag tag-green">Passed</span>{" "}
          </div>
          <h2>Solid Understanding</h2>
          <p className="cl-text">
            Great job! You've got a very solid grasp of the baseline concepts. Keep practice modules flowing to push yourself to that elite 100%
            bracket.
          </p>
        </div>
      </div>

      <div className="test-complete-buttons center-item">
        <Button text="Retake Test" />
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
