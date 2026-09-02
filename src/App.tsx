// import "./App.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { GiCheckMark } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { Button } from "./components";
import Layout from "./Layout";
import "./styles/pages/home.scss";
import { useQuiz } from "./context";
import { useEffect } from "react";

function App() {
  const { selectTopic } = useQuiz();

  useEffect(() => {
    selectTopic(null);
  });

  return (
    <Layout>
      <div className="home">
        <div className="home-left">
          <div className="home-left-cover">
            <div className="tag tag-indigo">
              <span>
                <img src="/ai.png" alt="Ai" />
              </span>
              <p>fast learning platform</p>
            </div>
            <h1 className="home-left-heading">TEST ME</h1>

            <p className="home-left-copy">
              Challenge your knowledge, unlock verified certificates, and master complex engineering, history, and math concepts with adaptive modular
              tests.
            </p>

            <div className="home-left-buttons">
              {/* <button className="btn btn-indigo">
                <span>Start New Test</span>
              </button> */}
              <NavLink to={"/topics"}>
                <Button text="Start New Test">
                  <span className="btn-icon">
                    <FaArrowRightLong />
                  </span>
                </Button>
              </NavLink>

              <NavLink to="/past" className="link">
                View Past Tests
              </NavLink>
            </div>

            <div className="home-left-users">
              <div className="hlu-left">
                <HLUser />
                <HLUser position={1} />
                <HLUser position={2} />
                <HLUser position={3} />
              </div>
              <div className="hlu-right">
                <p>
                  Join over <strong className="hlu-right-count">24,000+ active learners</strong> testing today.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-right">
          <div className="home-right-illustration">
            {/* <img src="/illustration.png" alt="Illustration" /> */}
            <div className="home-right-quick">
              <div className="hrq-left">
                <span>
                  <GiCheckMark />
                </span>
              </div>
              <div className="hrq-middle">
                <span className="tag tag-green">Mastered</span>
              </div>
              <div className="hrq-right">
                <strong>Javascript Master</strong>
                <p>Score: 90%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;

function HLUser({ path = "/user2.jpg", position: pos = 0 }: { path?: string; position?: number }) {
  return (
    <div className="hlu-user" style={{ "--position": `-${pos * 3}0%` } as any}>
      <img src={path} alt="" />
    </div>
  );
}
