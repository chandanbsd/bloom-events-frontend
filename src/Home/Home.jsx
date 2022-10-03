import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/user";
import BackgroundIMG from "../images/background.jpeg";
import "./home.css";
const Home = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  const userFromStore = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(userFromStore);

  return (
    <React.Fragment>
      {userFromStore === undefined ||
      userFromStore === null ||
      userFromStore.firstName === null ||
      userFromStore.firstName === undefined ? (
        <div className="home-light">
          <h1>Home Page</h1>
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
      ) : (
        <div className="home-light">
          <h1>
            {userFromStore.isOwner
              ? "Hello Venue Owner"
              : "Hello Event Participants"}
          </h1>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
