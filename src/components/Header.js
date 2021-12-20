import React from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import useWindowSize from "../hooks/useWindowSize";

// import context

export default function Header({ title }) {
  // Use Context
  const { width } = useWindowSize();

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
