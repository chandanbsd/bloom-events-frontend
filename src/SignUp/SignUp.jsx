import React, { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/user";
import baseURL from "../constants/constants";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const user = useSelector((state) => state.user);
  const [captchaStatus, setCaptchaStatus] = useState(false);

  const dispatch = useDispatch();
  const recaptchaRef = useRef();
  const [signUpDetails, setSignUpDetails] = useState({});
  const navigate = useNavigate();
  useEffect(() => {}, [signUpDetails]);

  const handleSignUp = () => {
    if (signUpDetails.firstName === undefined) {
      alert("Incorrect First Name");
    } else if (signUpDetails.lastName === undefined) {
      alert("Incorrect Last Name");
    } else if (signUpDetails.email === undefined) {
      alert("Incorrect Email");
    } else if (signUpDetails.userName === undefined) {
      alert("Incorrect Username");
    } else if (signUpDetails.password === undefined) {
      alert("Incorrect Password");
    } else if (captchaStatus == false) {
      alert("Captcha Failed, Please try again");
    } else if (signUpDetails.isOwner === undefined) {
      alert("Choose if you are a venue owner?");
    } else {
      console.log(JSON.stringify(signUpDetails));
      const url = `${baseURL}/register`;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpDetails),
      };
      fetch(url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === "OK") {
            dispatch(setProfile({ ...signUpDetails }));
            navigate("/");
          } else {
            alert("Update Failed");
          }
        })
        .catch((error) => console.log("Form submit error", error));
    }
  };

  const onCaptchaChange = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    setCaptchaStatus(recaptchaValue);
  };

  if (user.userName === null) {
    return (
      <div className="mx-auto" style={{ width: "500px" }}>
        <h1>Signup</h1>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, firstName: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, lastName: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, email: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, userName: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, password: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div className="form-group">
          <label>Are You a Venue Owner?</label>
          <select
            className="form-control"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, isOwner: e.target.value })
            }
          >
            <option value={undefined}>Select your option</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <br />
        </div>
        <div>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onCaptchaChange}
          />
        </div>
        <div>
          <button onClick={() => handleSignUp()} className="btn btn-success">
            SignUp
          </button>
        </div>
      </div>
    );
  } else {
    return <h1>You are already Logged In</h1>;
  }
};

export default SignUp;
