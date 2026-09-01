import type { ReactNode } from "react";
import { AiOutlinePython } from "react-icons/ai";
import { BiMath } from "react-icons/bi";
import { GoCode, GoGlobe } from "react-icons/go";
import { LuBook } from "react-icons/lu";
import { MdOutlineTopic } from "react-icons/md";
import { PiAtom } from "react-icons/pi";
import { Button, Return } from "./components";
import Layout from "./Layout";
import "./styles/pages/topics.scss";
import { Link } from "react-router-dom";

export default function Topics() {
  return (
    <Layout>
      <div className="topics">
        <Return text="Back to Home" />
        <h1 className="topics-heading">Choose Your Topic</h1>
        <p className="topics-copy">
          Select a domain below to launch your dynamically generated modular assessment. Track your strength and weaknesses in real-time.
        </p>

        <div className="topics-cards">
          <Topic color="orange" title="JavaScript" icon={<GoCode />} />
          <Topic color="blue" title="Python" icon={<AiOutlinePython />} />
          <Topic color="pink" title="History" icon={<LuBook />} />
          <Topic color="green" title="Science" icon={<PiAtom />} />
          <Topic color="purple" title="Math" icon={<BiMath />} />
          <Topic color="indigo" title="General" icon={<GoGlobe />} />
        </div>

        <div className="center-item" style={{ marginTop: "3rem" }}>
          <Link to={"/test"} style={{ width: "max-content" }}>
            <Button text="Generate Quiz" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

type TopicProps = { color: "blue" | "indigo" | "green" | "purple" | "pink" | "orange"; title: string; icon?: ReactNode };
function Topic({ color, title, icon }: TopicProps) {
  const active = title == "JavaScript" ? "active" : "";

  return (
    <div className={`topic ${active}`}>
      <div className={`topic-icon ${color}`}>{icon || <MdOutlineTopic />}</div>
      <strong className="topic-title">{title}</strong>
      <p className="topic-questions">10 Questions</p>
    </div>
  );
}
