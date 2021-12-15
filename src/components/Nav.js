import React, { useState } from "react";
import { ImMenu } from "react-icons/im";
import { Link } from "react-router-dom";

export default function Nav({ search, setSearch, width }) {
  const [viewMenuMobile, setViewMenuMobile] = useState(false);
  const mobileMenu = () => {
    if (viewMenuMobile) {
      document.querySelector(".lists").style.display = "block";
      setViewMenuMobile(!viewMenuMobile);
    } else {
      document.querySelector(".lists").style.display = "none";
      setViewMenuMobile(!viewMenuMobile);
    }
  };
  return (
    <nav className="Nav">
      <div className="NavDiv">
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search">Search Post</label>
          <input
            id="search"
            type="text"
            placeholder="Search Post"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <ImMenu className="mobileMenu" onClick={mobileMenu} />
      </div>

      <div className={width < 768 ? "lists" : "lists1"}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/post">Create Post</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
