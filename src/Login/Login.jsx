import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { setProfile } from "../redux/user";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const userFromStore = useSelector((state) => state.user);
  const [captchaStatus, setCaptchaStatus] = useState(false);
  const dispatch = useDispatch();

  const [loginDetails, setloginDetails] = useState({});

  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  const [speciaLoginUsername, setSpeciaLoginUsername] = useState(null);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const recaptchaRef = React.createRef();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (loginDetails.userName === undefined) {
      alert("Incorrect Username");
    } else if (loginDetails.password === undefined) {
      alert("Incorrect Password");
    } else if (captchaStatus === false) {
      alert("Captcha Failed, Please try again");
    } else {
      const url = "http://localhost:5000/login";
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          dispatch(setProfile({ ...res }));
        })
        .catch((error) => console.log("Form submit error", error));
    }
  };

  const handleSpecialLogin = () => {
    if (
      speciaLoginUsername === null ||
      speciaLoginUsername === "" ||
      speciaLoginUsername === undefined
    ) {
      alert("Please enter the Username");
    } else {
      loginWithRedirect();
      console.log(user);
      console.log(speciaLoginUsername);
      dispatch(
        setProfile({
          firstName: user.given_name,
          lastName: user.family_name,
          email: user.email,
          password: null,
          userName: speciaLoginUsername,
        })
      );
    }
  };

  const onCaptchaChange = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    setCaptchaStatus(recaptchaValue);
  };
  if (userFromStore.username == null) {
    return (
      <div className="mx-auto" style={{ width: "500px" }}>
        <h1>Login</h1>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              setloginDetails({ ...loginDetails, userName: e.target.value })
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
              setloginDetails({ ...loginDetails, password: e.target.value })
            }
          />
          <br />
        </div>
        <div>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onCaptchaChange}
          />
        </div>
        <div className="form-group" style={{ width: "500px" }}>
          <button onClick={handleLogin} className="btn btn-success">
            Login
          </button>
          <Link to="signup" className="btn btn-primary">
            Signup
          </Link>{" "}
        </div>
        <hr></hr>
        <div className="form-group" style={{ width: "500px" }}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setSpeciaLoginUsername(e.target.value)}
            />
            <br />
          </div>
          <button
            onClick={() => handleSpecialLogin()}
            className="btn btn-success"
          >
            Login With OAuth
          </button>
        </div>
      </div>
    );
  } else {
    return <h1>{userFromStore.firstName} is already logged In</h1>;
  }
};

export default Login;
