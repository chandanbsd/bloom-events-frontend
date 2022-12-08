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
import { firebaseAuthObj } from "../constants/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const userFromStore = useSelector((state) => state.user);
  const { logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeFromStore = useSelector((state) => state.theme);
  const [localTheme, setLocalTheme] = useState(null);
  const handleLogout = async () => {
    await dispatch(
      setProfile({
        firstName: null,
        lastName: null,
        email: null,
        userName: null,
        password: null,
        isOwner: null,
      })
    );


    signOut(firebaseAuthObj)
      .then(() => alert("Signed Out"))
      .then(() => navigate("/"))
      .catch((error) => alert("Failed to Sign Out", error.message()));
    // logout({ returnTo: window.location.origin });
  };

  const handleSpecialLogout = () => {
    // auth().signOut();
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
    signOut(firebaseAuthObj)
      .then(() => alert("Signed Out"))
      .then(()=> logout({ returnTo: window.location.origin }))
      .catch((error) => alert("Failed to Sign Out", error.message()));
    
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
        <Link to="/" reloadDocument className="nav-item navbar-brand">
          <span>Bloom Events Home</span>
        </Link>
        {userFromStore && userFromStore.isOwner == "true" ? (
          <>
            <Link to="venue-creation" reloadDocument className="btn btn-primary nav-item navbar-brand">
              <span>Add Venue</span>
            </Link>
            <Link to="venue-search" reloadDocument className="btn btn-primary nav-item navbar-brand">
              <span>Manage Venue</span>
            </Link>
            <Link to="/calendar" reloadDocument className="btn btn-primary nav-item navbar-brand">
              <span>View Bookings</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="venue-search" reloadDocument className="btn btn-primary btn btn-primary nav-item navbar-brand">
              <span>Venue Search</span>
            </Link>
            <Link to="activity-search" reloadDocument className="btn btn-primary nav-item navbar-brand">
              <span>Activity Search</span>
            </Link>
            <Link to="participant-search" reloadDocument className="btn btn-primary nav-item navbar-brand">
              <span>Participant Search</span>
            </Link>
          </>
        )}

        {userFromStore.userName === null ? (
          <React.Fragment>
            <Link to="login" reloadDocument className="btn btn-primary nav-item navbar-brand">
              Login
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>


            
                {userFromStore.isOwner != "true" && <Link to="../calendar" reloadDocument className="btn btn-primary nav-item navbar-brand">
                  Calendar
                </Link>}
                <Link to="../bookmarks" reloadDocument className="btn btn-primary nav-item navbar-brand">
                  Bookmarks
                </Link>

                <Link to="../profile" className="btn btn-success nav-item navbar-brand">
                {`Hello, ${userFromStore.firstName}`}
                </Link>

                {isAuthenticated === false ? (
                  <Link to="/" onClick={handleLogout}  className="btn btn-danger nav-item navbar-brand">
                    Logout
                  </Link>
                ) : (
                  <button
                    onClick={handleSpecialLogout}
                    className="btn btn-danger nav-item navbar-brand"
                  >
                    Logout
                  </button>
                )}
 
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
