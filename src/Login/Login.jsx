import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import "./login.css";
import { setProfile } from "../redux/user";

const Login = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [signUpDetails, setSignUpDetails] = useState({});
  useEffect(() => {}, [signUpDetails]);

  const handleSignUp = () => {
    if (signUpDetails.userName === undefined) {
      alert("Incorrect Username");
    } else if (signUpDetails.password === undefined) {
      alert("Incorrect Password");
    } else if (signUpDetails.isOwner === undefined) {
      alert("Choose if you are a venue owner?");
    } else {
      dispatch(setProfile({ ...signUpDetails }));

      console.log(JSON.stringify(signUpDetails));
      const url = "http://localhost:4000/userSignup";
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpDetails),
      };
      fetch(url, requestOptions)
        .then((response) => console.log(response))
        .catch((error) => console.log("Form submit error", error));
    }
  };

  return (
    <div className="form">
      Login
      <div>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) =>
            setSignUpDetails({ ...signUpDetails, userName: e.target.value })
          }
        />{" "}
        <br />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          onChange={(e) =>
            setSignUpDetails({ ...signUpDetails, password: e.target.value })
          }
        />{" "}
        <br />
      </div>
    </div>
  );
};

export default Login;
