import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProfile } from "../redux/user";

import "./navbar.css";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(
      setProfile({
        firstName: null,
        lastName: null,
        email: null,
        userName: null,
        password: null,
        isOwner: null,
      })
    );
  };

  return (
    <div className="navbar">
      <Link to="/" className="nav-item">
        <span className="nav-item">Bloom Events Home</span>
      </Link>
      {user.userName === null ? (
        <React.Fragment>
          <Link to="login" className="nav-item">
            Login
          </Link>
          <Link to="signup" className="nav-item">
            Signup
          </Link>{" "}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <span className="nav-item" onClick={handleLogout}>
            Logout
          </span>
          <Link to="Profile" className="nav-item">
            {`Hello, ${user.firstName}`}
          </Link>
        </React.Fragment>
      )}
    </div>
  );
};

export default Navbar;
