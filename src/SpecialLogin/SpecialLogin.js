import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { setProfile } from "../redux/user";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth0 } from "@auth0/auth0-react";
import baseURL from "../constants/constants";

const SpecialLogin = () => {
  const userFromStore = useSelector((state) => state.user);
  const [captchaStatus, setCaptchaStatus] = useState(false);
  const dispatch = useDispatch();

  const [loginDetails, setloginDetails] = useState({});

  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();
  const [specialLoginDetails, setSpecialLoginDetails] = useState(
    JSON.parse(localStorage.getItem("specialLoginDetails"))
  );

  const [passwordResetEmail, setPasswordResetEmail] = useState(null);

  const recaptchaRef = React.createRef();
  const navigate = useNavigate();

  const handleSpecialLogin = () => {
    loginWithRedirect();
  };

  if (userFromStore.username == null) {
    return (
      <div className="mx-auto" style={{ width: "500px" }}>
        <h1 className="text-center">Login With OAuth</h1>
        <br />
        <br />
        <div className=" form-group d-flex justify-content-around">
          <button onClick={() => handleSpecialLogin()} className="btn btn-info">
            Click to login
          </button>
        </div>
      </div>
    );
  } else {
    return <h1>{userFromStore.firstName} is already logged In</h1>;
  }
};

export default SpecialLogin;
