import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { setProfile } from "../redux/user";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const user = useSelector((state) => state.user);
  const [captchaStatus, setCaptchaStatus] = useState(false);
  const dispatch = useDispatch();

  const [loginDetails, setloginDetails] = useState({});
  useEffect(() => {}, [loginDetails]);
  const recaptchaRef = React.createRef();
  const handleLogin = () => {
    if (loginDetails.userName === undefined) {
      alert("Incorrect Username");
    } else if (loginDetails.password === undefined) {
      alert("Incorrect Password");
    } else if (captchaStatus == false) {
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
          // console.log(res);
          // dispatch(setProfile({ ...res }));
        })
        .catch((error) => console.log("Form submit error", error));
    }
  };

  const onCaptchaChange = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    setCaptchaStatus(recaptchaValue);
  };
  if (user.username == null) {
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
      </div>
    );
  } else {
    return <h1>{user.firstName} is already logged In</h1>;
  }
};

export default Login;
