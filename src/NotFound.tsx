import { NavLink } from "react-router-dom";
import Layout from "./Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="not-found">
        <div className="not-found-cover">
          <h1>404 | Sorry! Can't find this page.</h1>
          <div className="center-item cl-text" style={{ marginTop: "1.5rem" }}>
            <NavLink to={"/"} className={"link text-link"}>
              Home
            </NavLink>
            <NavLink to={"/topics"} className={"link text-link"}>
              Topics
            </NavLink>
            <NavLink to={"/past"} className={"link text-link"}>
              Past tests
            </NavLink>
            <NavLink to={"/developer"} className={"link text-link"}>
              The developer
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  );
}
