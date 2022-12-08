import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/user";
import BackgroundIMG from "../images/background.jpeg";
import "./home.css";
import themeStyles from "../themeStyles";
const Home = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  const userFromStore = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const themeFromStore = useSelector((state) => state.theme);

  return (
    <div
      style={{ minHeight: "100vh" }}
      className={
        "mx-auto text-center " +
        themeStyles[themeFromStore.value].body +
        " text-center"
      }
    >

        <div className={themeStyles[themeFromStore.value].body}>
          
          <div>
          <h1>
            {userFromStore.isOwner == "true"
              ? "Hello Venue Owner"
              : "Hello Event Participants"}
          </h1>
        </div>
          <h2>Welcome to bloom events</h2>
          <p>
            We plan to be the No. 1 destination to search and reserve venue in
            bloomington
          </p>
          <img
            src={BackgroundIMG}
            className="img-fluid"
            alt="Responsive image"
            style={{ width: "50%" }}
          />
        </div>
      
    </div>
  );
};

export default Home;
