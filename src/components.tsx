import type { ReactNode } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

export function Button({ children, text, color = "indigo" }: { children?: ReactNode; text: string; color?: "indigo" | "none" }) {
  return (
    <button className={`btn btn-${color}`}>
      {text}
      {children}
    </button>
  );
}

export function Return({ to, text }: { to?: string; text?: string }) {
  const nav = useNavigate();

  if (to)
    return (
      <NavLink to={to} className="return">
        <span>
          <FaArrowLeftLong />
        </span>
        {text ? text : "To Previos Page"}
      </NavLink>
    );

  return (
    <div className="return" onClick={() => nav(-1)}>
      <span>
        <FaArrowLeftLong />
      </span>
      {text ? text : "To Previos Page"}
    </div>
  );
}
