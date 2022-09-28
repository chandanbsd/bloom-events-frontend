import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="navbar">
      <Link to="/" className="nav-item">
        <span className="nav-item">Bloom Events Home</span>
      </Link>

      <Link to="signup" className="nav-item">
        Login/Signup/Logout
      </Link>
      <Link to="Profile" className="nav-item">
        {user.firstName != undefined ? `Hello, ${user.firstName}` : "Profile"}
      </Link>
    </div>
  );
};

export default Navbar;
