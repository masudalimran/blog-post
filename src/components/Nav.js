import React, { useState, useEffect, useContext } from "react";
import { ImMenu } from "react-icons/im";
import { Link } from "react-router-dom";

// import Context
import DataContext from "../context/DataContext";

export default function Nav() {
  // Use Context
  const { search, setSearch, width } = useContext(DataContext);

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
  useEffect(() => {
    if (width < 768) {
      document.querySelector(".lists").style.display = "none";
      document.querySelector(".mobileMenu").style.display = "block";
      document.querySelector(".NavDiv").style.flexDirection = "column";
    } else {
      document.querySelector(".lists").style.display = "block";
      document.querySelector(".mobileMenu").style.display = "none";
      document.querySelector(".NavDiv").style.flexDirection = "row";
    }
  }, [width]);
  return (
    <nav className="Nav">
      <div className="NavDiv">
        <div className="searchNMenu">
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

        <div className="lists">
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
      </div>
    </nav>
  );
}
