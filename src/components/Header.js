import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";

// import Context
import DataContext from "../context/DataContext";

export default function Header({ title }) {
  const { width } = useContext(DataContext);

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
