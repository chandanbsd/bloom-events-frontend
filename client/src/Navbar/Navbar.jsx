import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <span>
        <h1>Bloom Events</h1>
      </span>
      <span>
        <Link to="login">Login/Signup</Link>
      </span>
      {/* <span>Profile</span> */}
    </div>
  );
};

export default Navbar;
