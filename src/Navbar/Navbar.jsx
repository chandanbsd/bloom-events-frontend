import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setProfile } from "../redux/user";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const userFromStore = useSelector((state) => state.user);
  const { logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
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

    navigate("/");
  };

  const handleSpecialLogout = () => {
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
    logout({ returnTo: window.location.origin });
  };

  return (
    <nav className="navbar flex-column flex-sm-row navbar-light bg-light ">
      <Link to="/" className="nav-item">
        <span className="nav-item fs-3">Bloom Events Home</span>
      </Link>
      <Link to="venue-search" className="nav-item">
        <span className="nav-item fs-3">Venue Search</span>
      </Link>
      <Link to="activity-search" className="nav-item">
        <span className="nav-item fs-3">Activity Search</span>
      </Link>
      {userFromStore.userName === null ? (
        <React.Fragment>
          <Link to="login" className="nav-item fs-3">
            Login
          </Link>
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
              {isAuthenticated === false ? (
                <Link to="/" onClick={handleLogout} className="dropdown-item">
                  Logout
                </Link>
              ) : (
                <button onClick={handleSpecialLogout} className="dropdown-item">
                  LogOut
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
