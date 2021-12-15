import React from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";

export default function Header({ title, width }) {
  return (
    <header className="Header">
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <h1>{title}</h1>
      </Link>
      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </header>
  );
}
