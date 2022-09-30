import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProfile } from "../redux/user";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";

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
    <nav className="navbar flex-column flex-sm-row navbar-light bg-light ">
      <Link to="/" className="nav-item">
        <span className="nav-item fs-3">Bloom Events Home</span>
      </Link>
      {user.userName === null ? (
        <React.Fragment>
          <Link to="login" className="nav-item fs-3">
            Login
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* <div className="dropdown">
            <button
              className="btn btn-success dropdown-toggle"
              id="dropdownMenuButton"
            >
              Hello, {user.firstName}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div className="dropdown-item">Profile Page</div>
              <div className="dropdown-item">Logout</div>
            </div>
          </div> */}
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {`Hello, ${user.firstName}`}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link to="../Profile" className="dropdown-item">
                Profile
              </Link>
              <Link
                to="../Profile"
                onClick={handleLogout}
                className="dropdown-item"
              >
                Logout
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </React.Fragment>
      )}
    </nav>
  );
};

export default Navbar;
