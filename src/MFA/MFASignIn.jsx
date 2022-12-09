import React, { useEffect } from "react";
import { useState } from "react";
import baseURL from "../constants/constants";

import { setProfile } from "../redux/user";

import { firebaseAuthObj } from "../constants/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const MFASignIn = ({ loginDetails, username, dispatch, navigate }) => {
  const [otp, setOtp] = useState(null);

  const submitMFADetails = () => {
    const url = `${baseURL}/MFA`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, otp: otp }),
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.body == "true") {
          handleLogin();
        } else if (res.body == "false") {
          alert("OTP Incorrect: Please retry");
        }
      });
  };

  const handleLogin = () => {
    if (loginDetails.userName === undefined) {
      alert("Incorrect Username");
    } else if (loginDetails.password === undefined) {
      alert("Incorrect Password");
    } else {
      const url = `${baseURL}/login`;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.status === "FAIL")
            alert("Login Failed: Check Username and Password");
          else {
            dispatch(setProfile({ ...res.body }));
            signInWithEmailAndPassword(
              firebaseAuthObj,
              res.body.email,
              loginDetails.password
            )
              .then((userCredential) => {
                alert("Welcome to Bloom Events");
              })
              .then(() => navigate("/"))
              .catch((error) => {
                alert("Failed To Login User to Bloom Chat");
              });
          }
        })
        .catch((error) => console.log("Form submit error", error));
    }
  };

  return (
    <div className="form-group">
      <label>OTP: </label>
      <input
        className="form-control"
        type="text"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={submitMFADetails} className="btn btn-success">
        Submit OTP
      </button>
    </div>
  );
};

export default MFASignIn;
