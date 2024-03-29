import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { setProfile } from "../redux/user";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth0 } from "@auth0/auth0-react";
import baseURL from "../constants/constants";
import themeStyles from "../themeStyles";
import { firebaseAuthObj } from "../constants/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import MFASignIn from "../MFA/MFASignIn";

const Login = () => {
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

  const themeFromStore = useSelector((state) => state.theme);
  const [mfa, setMFA] = useState(null);

  useEffect(() => {
    if (
      user !== undefined &&
      localStorage.getItem("loginWithOAuth") === "true"
    ) {
      const url = `${baseURL}/speciallogin`;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
        }),
      };

      fetch(url, requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.status === "FAIL") {
            alert("Please Signup First");
            localStorage.removeItem("loginWithOAuth");
          } else {
            console.log("hi");
            signInWithEmailAndPassword(
              firebaseAuthObj,
              res.body.email,
              "test123"
            )
              .then((userCredential) => {
                alert("Welcome to Bloom Events");
              })
              .then(() => {
                dispatch(setProfile({ ...res.body }));
                localStorage.removeItem("loginWithOAuth");
              })
              .catch((error) => {
                alert("Failed To Login User to Bloom Chat");
              });
          }
        });
    } else if (localStorage.getItem("specialLoginDetails") !== null) {
      if (
        userFromStore.firstName === null &&
        user !== undefined &&
        specialLoginDetails !== null
      ) {
        const url = `${baseURL}/specialregister`;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email,
            password: null,
            userName: specialLoginDetails.userName,
            isOwner: specialLoginDetails.isOwner,
            age: specialLoginDetails.age,
            gender: specialLoginDetails.gender,
            isAvailable: specialLoginDetails.isAvailable,
            bio: specialLoginDetails.bio,
            categoryType: specialLoginDetails.categoryType,
            categoryLevel: specialLoginDetails.categoryLevel,
            city: specialLoginDetails.city,
            state: specialLoginDetails.state,
          }),
        };

        fetch(url, requestOptions)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.status === "FAIL") {
              alert("Reenter Username, try 0Auth again");
              dispatch(
                setProfile({
                  firstName: null,
                  lastName: null,
                  email: null,
                  userName: null,
                  isOwner: null,
                  age: null,
                  gender: null,
                  isAvailable: null,
                  bio: null,
                  categoryType: null,
                  categoryLevel: null,
                  city: null,
                  state: null,
                })
              );
              localStorage.removeItem("specialLoginDetails");
              logout({ returnTo: window.location.origin });
            } else {
            }
            return res;
          })
          .then((res) => {
            createUserWithEmailAndPassword(
              firebaseAuthObj,
              res.body.email,
              "test123"
            )
              .then((userCredential) => {
                alert("Welcome to Bloom Events");
              })
              .then(() => {
                dispatch(setProfile({ ...res.body }));
                localStorage.removeItem("specialLoginDetails");
                navigate("/");
              })
              .catch((error) => {
                alert("Failed To Signup User to Bloom Chat");
              });
          })
          .catch((error) => console.log("Form submit error", error));
      }
    }
  }, [user, specialLoginDetails]);
  const recaptchaRef = React.createRef();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (loginDetails.userName === undefined) {
      alert("Incorrect Username");
    } else if (loginDetails.password === undefined) {
      alert("Incorrect Password");
    } else if (captchaStatus === false) {
      alert("Captcha Failed, Please try again");
    } else if (mfa == null) {
      alert("Enter OTP");
      setMFA(true);
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

  const sendPasswordResetEmail = () => {
    if (
      passwordResetEmail !== null &&
      passwordResetEmail !== undefined &&
      passwordResetEmail !== ""
    ) {
      const url = `${baseURL}/reset_mail`;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: passwordResetEmail }),
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.status === "FAIL") alert("Email Failed");
          else {
            alert("Email Sent Successfully");
            navigate("/");
          }
        })
        .catch((error) => console.log("Form submit error", error));
    }
  };

  const onCaptchaChange = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    setCaptchaStatus(recaptchaValue);
  };
  if (userFromStore.username == null) {
    return (
      <div
        className={themeStyles[themeFromStore.value].body}
        style={{ minHeight: "100vh" }}
      >
        <div className="mx-auto" style={{ width: "500px" }}>
          <h1 className="text-center">Login Page</h1>
          <br />
          <br />
          {mfa == null && (
            <div>
              <div className="form-group">
                <label>Username: </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setloginDetails({
                      ...loginDetails,
                      userName: e.target.value,
                    })
                  }
                />
                <br />
              </div>
              <div className="form-group">
                <label>Password: </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) =>
                    setloginDetails({
                      ...loginDetails,
                      password: e.target.value,
                    })
                  }
                />
                <br />
              </div>
              <div className="d-flex justify-content-around">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  onChange={onCaptchaChange}
                />
              </div>
              <div
                style={{ width: "500px" }}
                className="form-group d-flex justify-content-around"
              >
                <button onClick={handleLogin} className="btn btn-success">
                  Login with Email
                </button>
              </div>
            </div>
          )}
          {mfa == true && (
            <MFASignIn
              username={loginDetails.userName}
              loginDetails={loginDetails}
              dispatch={dispatch}
              navigate={navigate}
            />
          )}
          <br />

          <hr
            style={{
              size: "20px",
              height: "12px",
              background: "blue",
            }}
          />
          <br />
          <br />
          <div
            style={{ width: "500px" }}
            className="form-group d-flex justify-content-around"
          >
            <Link
              to="special-login"
              className="btn btn-primary"
              onClick={() => {
                localStorage.setItem("loginWithOAuth", JSON.stringify(true));
              }}
              reloadDocument
            >
              Signin with OAuth
            </Link>{" "}
          </div>
          <br />
          <br />
          <hr
            style={{
              size: "20px",
              height: "12px",
              background: "blue",
            }}
          />
          <br />
          <br />
          <div
            style={{ width: "500px" }}
            className="form-group d-flex justify-content-around"
          >
            <Link to="signup" reloadDocument className="btn btn-primary">
              Signup with Email
            </Link>{" "}
            <Link
              to="special-signup"
              reloadDocument
              className="btn btn-primary"
            >
              Signup with OAuth
            </Link>{" "}
          </div>
          <br />
          <br />
          <hr
            style={{
              size: "20px",
              height: "12px",
              background: "blue",
            }}
          />

          <br />

          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setPasswordResetEmail(e.target.value)}
            />
            <br />
          </div>
          <div className=" form-group d-flex justify-content-around">
            <button
              onClick={() => sendPasswordResetEmail()}
              className="btn btn-danger"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>{userFromStore.firstName} is already logged In</h1>;
  }
};

export default Login;
