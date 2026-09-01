import { LiaTimesCircle } from "react-icons/lia";
import { Button } from "./components";
import Layout from "./Layout";
import "./styles/pages/test.scss";
import { IoMdCheckmarkCircleOutline, IoMdInformationCircleOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function Test() {
  return (
    <Layout>
      <div className="test">
        <div className="test-complete">
          <h1 style={{ textAlign: "center" }}>Quiz Complete</h1>
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
      </div>
    </Layout>
  );
}

function TestQuestion() {
  return (
    <>
      <div className="test-progress">
        <div className="separate-items test-progress-head">
          <p className="test-progress-count">QUESTION 6 OF 10</p>
          <p className="test-topic">JAVACRIPT</p>
        </div>

        <div className="progress">
          <div className="progress__bar" style={{ "--progress": `${60}%` } as any} />
        </div>
      </div>

      <div className="test-question">
        <h2>Which of the following is not a primitive data type in JavaScript?</h2>
      </div>

      <div className="test-options">
        <AnswerOption option="A" value="String" />
        <AnswerOption option="B" value="Number" status="selected" />
        <AnswerOption option="C" value="Array" status="correct" />
        <AnswerOption option="D" value="Boolean" status="wrong" />
      </div>

      <div className="test-answer">
        <div className="test-answer-head">
          <span className="test-answer-head-icon">
            <IoMdInformationCircleOutline />{" "}
          </span>
          <span>Explanation</span>
        </div>
        <p>
          Arrays in JavaScript are objects, not primitive data types. Primitives are basic building blocks that contain raw values, which include
          String, Number, Boolean, Undefined, Null, and Symbol.
        </p>
      </div>

      <div className="right-items">
        <Button text="Next" />
      </div>
    </>
  );
}

function AnswerOption({ option, value, status = "none" }: { option: string; value: string; status?: "none" | "selected" | "correct" | "wrong" }) {
  return (
    <div className={`option ${status}`}>
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
