import React from "react";
import { Link } from "react-router-dom";

export default function Header({ title }) {
  return (
    <header className="Header">
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <h1>{title}</h1>
      </Link>
    </header>
  );
}
