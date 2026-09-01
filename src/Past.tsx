import { Return } from "./components";
import Layout from "./Layout";
import "./styles/pages/past.scss";

export default function Past() {
  return (
    <Layout>
      <div className="past">
        <Return to="/" text="Back to Home" />
        <h1 style={{ marginBlock: "2rem" }}>Your Past Tests</h1>
        <p className="cl-text">Review your historical scores, identify learning gaps, and seamlessly restart any module to break your high scores.</p>

        <div className="past-tests">
          <PastTest />
          <PastTest />
          <PastTest />
          <PastTest />
          <PastTest />

          <p className="cl-text" style={{ textAlign: "center", marginTop: "4rem" }}>
            Showing 5 completed assesments
          </p>
        </div>
      </div>
    </Layout>
  );
}

function PastTest() {
  return (
    <div className="past-test">
      <div className="past-test-left">
        <div className="past-test-percentage">90%</div>
        <div className="past-test-topic">
          <strong>JavaScript</strong>
          <p className="cl-text">Taken 2 days ago</p>
        </div>
      </div>
      <div className="past-test-right">
        <div className="past-test-score">9/10</div>
        <div className="retake-btn">Retake</div>
      </div>
    </div>
  );
}
