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
  const [specialLoginDetails, setSpecialLoginDetails] = useState(
    JSON.parse(localStorage.getItem("specialLoginDetails"))
  );

  useEffect(() => {
    console.log(localStorage.getItem("specialLoginDetails"));
    if (
      userFromStore.firstName === null &&
      user !== undefined &&
      specialLoginDetails !== null
    ) {
      console.log({
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
        password: null,
        userName: specialLoginDetails.userName,
        isOwner: specialLoginDetails.isOwner,
      });
      dispatch(
        setProfile({
          firstName: user.given_name,
          lastName: user.family_name,
          email: user.email,
          password: null,
          userName: specialLoginDetails.userName,
          isOwner: specialLoginDetails.isOwner,
        })
      );

      // localStorage.clear("specialLoginDetails");
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
          console.log("From Backend:", res);
          dispatch(setProfile({ ...res.body }));
        })
        .catch((error) => console.log("Form submit error", error));
    }
  };

  const handleSpecialLogin = () => {
    if (
      specialLoginDetails === null ||
      specialLoginDetails === "" ||
      specialLoginDetails === undefined
    ) {
      alert("Please enter the Username");
    } else {
      localStorage.setItem(
        "specialLoginDetails",
        JSON.stringify(specialLoginDetails)
      );

      console.log("saved to local storage");

      loginWithRedirect();
    }
  };

  const onCaptchaChange = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    setCaptchaStatus(recaptchaValue);
  };
  if (userFromStore.username == null) {
    return (
      <div className="mx-auto" style={{ width: "500px" }}>
        <h1 className="text-center">Login Page</h1>
        <br />
        <br />
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
        <div className="d-flex justify-content-around">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onCaptchaChange}
          />
        </div>
        <br />
        <div
          style={{ width: "500px" }}
          className="form-group d-flex justify-content-around"
        >
          <button onClick={handleLogin} className="btn btn-success">
            Login with Email
          </button>
          <Link to="signup" className="btn btn-primary">
            Signup with Email
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

        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              setSpecialLoginDetails({
                ...specialLoginDetails,
                userName: e.target.value,
              })
            }
          />
          <br />
        </div>

        <div className="form-group">
          <label>Are You a Venue Owner?</label>
          <select
            className="form-control"
            onChange={(e) => {
              setSpecialLoginDetails({
                ...specialLoginDetails,
                isOwner: e.target.value,
              });
            }}
          >
            <option value={undefined} disabled>
              Select your option
            </option>
            <option value={true} defaultValue>
              Yes
            </option>
            <option value={false}>No</option>
          </select>
          <br />
        </div>

        <div className=" form-group d-flex justify-content-around">
          <button
            onClick={() => handleSpecialLogin()}
            className="btn btn-success"
          >
            Login/Signup With OAuth
          </button>
        </div>
      </div>
    );
  } else {
    return <h1>{userFromStore.firstName} is already logged In</h1>;
  }
};

export default Login;
