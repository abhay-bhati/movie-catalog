import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__main">
        <Link to="/">
          <div>Add Movie</div>
        </Link>
        <Link to="/movies">
          <div>Movies</div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
