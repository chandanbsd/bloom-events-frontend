import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProfile } from "../redux/user";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const userFromStore = useSelector((state) => state.user);
  const { logout, user } = useAuth0();

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
      {userFromStore.userName === null && user?.firstName !== null ? (
        <React.Fragment>
          <Link to="login" className="nav-item fs-3">
            Login
          </Link>
          <button
            onClick={() => {
              logout({ returnTo: window.location.origin });
              console.log(user);
            }}
          >
            Log Out
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {`Hello, ${userFromStore.firstName}`}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link to="../Profile" className="dropdown-item">
                Profile
              </Link>
              {user === null ? (
                <Link
                  to="../Profile"
                  onClick={handleLogout}
                  className="dropdown-item"
                >
                  Logout
                </Link>
              ) : (
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Log Out
                </button>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </React.Fragment>
      )}
    </nav>
  );
};

export default Navbar;
