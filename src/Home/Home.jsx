import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/user";
import "./home.css";
const Home = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  const userFromStore = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userFromStore.firstName === null && user !== undefined) {
      dispatch(
        setProfile({
          firstName: user.given_name,
          lastName: user.family_name,
          email: user.email,
          password: null,
        })
      );
    }
  }, [user]);

  return (
    <div className="home-light">
      <React.Fragment>
        <h1>Home Page</h1>
        <h2>Welcome to bloom events</h2>
        <p>
          We plan to be the No. 1 destination to search and reserve venue in
          bloomington
        </p>
      </React.Fragment>
    </div>
  );
};

export default Home;
