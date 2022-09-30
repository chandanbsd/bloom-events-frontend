import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProfile } from "../redux/user";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <nav className="navbar navbar-light bg-light">
      <Link to="/" className="nav-item">
        <span className="nav-item">Bloom Events Home</span>
      </Link>
      {user.userName === null ? (
        <React.Fragment>
          <Link to="login" className="nav-item">
            Login
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="dropdown">
            <button className="btn btn-success dropdown-toggle">
              Hello, {user.firstName}
            </button>
            <div className="dropdown-menu">
              <div className="dropdown-item">Profile Page</div>
              <div className="dropdown-item">Logout</div>
            </div>
          </div>
          <Link
            to="../Profile"
            className="nav-item"
          >{`Hello, ${user.firstName}`}</Link>
          <Link to="../Profile" onClick={handleLogout} className="nav-item">
            Logout
          </Link>
        </React.Fragment>
      )}
    </nav>
  );
};

export default Navbar;
