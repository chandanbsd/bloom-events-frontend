import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setProfile } from "../redux/user";
import { setTheme } from "../redux/theme";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth0 } from "@auth0/auth0-react";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import themeStyles from "../themeStyles";

const Navbar = () => {
  const userFromStore = useSelector((state) => state.user);
  const { logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeFromStore = useSelector((state) => state.theme);
  const [localTheme, setLocalTheme] = useState(null);
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

  const handleThemeChange = async () => {
    await dispatch(
      setTheme(themeFromStore.value == "light" ? "dark" : "light")
    );
  };
  useEffect(() => {
    if (localTheme == null) {
      setLocalTheme(themeFromStore.value);
    }
  }, [localTheme, themeFromStore.value]);

  return (
    localTheme != null && (
      <nav
        className={
          "navbar flex-column flex-sm-row navbar " +
          themeStyles[themeFromStore.value].navbar
        }
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <Link to="/" className="nav-item navbar-brand">
          <span>Bloom Events Home</span>
        </Link>
        <Link to="venue-search" className="nav-item navbar-brand">
          <span>Venue Search</span>
        </Link>
        <Link to="activity-search" className="nav-item navbar-brand">
          <span>Activity Search</span>
        </Link>
        <Link to="participant-search" className="nav-item navbar-brand">
          <span>Participant Search</span>
        </Link>

        {userFromStore.userName === null ? (
          <React.Fragment>
            <Link to="login" className="nav-item navbar-brand">
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
                <Link to="../profile" className="dropdown-item">
                  Profile
                </Link>
                <Link to="../calendar" className="dropdown-item">
                  Calendar
                </Link>
                <Link to="../bookmarks" className="dropdown-item">
                  Bookmarks
                </Link>
                {isAuthenticated === false ? (
                  <Link to="/" onClick={handleLogout} className="dropdown-item">
                    Logout
                  </Link>
                ) : (
                  <button
                    onClick={handleSpecialLogout}
                    className="dropdown-item"
                  >
                    LogOut
                  </button>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </React.Fragment>
        )}
        <span className="nav-item">
          <label htmlFor="theme-toggle">Dark Mode</label>
          <Toggle
            id="theme-toggle"
            onChange={() => {
              handleThemeChange();
            }}
            defaultChecked={themeFromStore.value == "light" ? false : true}
          />
        </span>
      </nav>
    )
  );
};

export default Navbar;
