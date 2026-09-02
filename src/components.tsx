import type { ReactNode } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import type { AnyObject } from "../types";

export function Button({
  children,
  text,
  color = "indigo",
  ...props
}: { children?: ReactNode; text: string; color?: "indigo" | "none" } & AnyObject) {
  return (
    <button className={`btn btn-${color}`} {...props}>
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
