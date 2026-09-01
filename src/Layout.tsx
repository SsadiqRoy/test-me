import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="layout">
      <header className="header">
        <div className="header-cover">
          <Link to={"/"} className="header-logo">
            <img src="/full-logo.png" alt="Logo" />
          </Link>
          <nav className="header-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/topics">Topics</NavLink>
            <NavLink to="/past">Past</NavLink>
            <NavLink to="/developer">Developer</NavLink>
          </nav>
          <div className="header-user">
            <div className="header-user-streak">🔥 5 Day Streak</div>
            <div className="header-user-image">
              <img src="/user1.jpg" alt="User" />
            </div>
          </div>
        </div>
      </header>
      <div className="main">{children}</div>
      <footer className="footer">
        <div className="footer-cover">
          <div className="footer-rights">&copy; {new Date().getFullYear()} Test Me Inc. All rights reserved.</div>
          <nav className="footer-nav">
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
            <p>Support Helpdesk</p>
            <p>
              <NavLink to="/developer">The Developer</NavLink>
            </p>
          </nav>
        </div>
      </footer>
    </section>
  );
}
