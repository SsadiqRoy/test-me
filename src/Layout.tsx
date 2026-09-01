import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="layout">
      <header className="header">
        <div className="header-cover">
          <div className="header-logo">
            <img src="/full-logo.png" alt="Logo" />
          </div>
          <nav className="header-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/topics">Topics</NavLink>
            <NavLink to="/past">Past</NavLink>
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
            <p>The Developer</p>
          </nav>
        </div>
      </footer>
    </section>
  );
}
