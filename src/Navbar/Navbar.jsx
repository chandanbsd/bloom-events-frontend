import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <span>Bloom Events</span>
      <Link to="/">Home</Link>
      <Link to="login">Login/Signup</Link>
      <Link to="Profile">Profile</Link>
    </div>
  );
};

export default Navbar;
