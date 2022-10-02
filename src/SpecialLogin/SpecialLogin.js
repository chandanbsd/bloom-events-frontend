import React, { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/user";
import { useAuth0 } from "@auth0/auth0-react";

const SpecialLogin = () => {
  const userFromStore = useSelector((state) => state.user);
  const [captchaStatus, setCaptchaStatus] = useState(false);

  const dispatch = useDispatch();
  const recaptchaRef = useRef();
  const [specialLoginDetails, setSpecialLoginDetails] = useState({});
  const { user } = useAuth0();
  useEffect(() => {}, [specialLoginDetails]);

  const handleSignUp = () => {
    if (specialLoginDetails.userName === undefined) {
      alert("Incorrect Username");
    } else if (specialLoginDetails.isOwner === undefined) {
      alert("Choose if you are a venue owner?");
    } else {
      setSpecialLoginDetails({
        ...specialLoginDetails,
        firstName: user.firstName,
      });
      setSpecialLoginDetails({
        ...specialLoginDetails,
        lastName: user.family_name,
      });
      setSpecialLoginDetails({ ...specialLoginDetails, email: user.email });
      setSpecialLoginDetails({ ...specialLoginDetails, password: null });

      dispatch(setProfile({ ...specialLoginDetails }));
      console.log(JSON.stringify(specialLoginDetails));
      const url = "http://localhost:5000/speciallogin";
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(specialLoginDetails),
      };
      fetch(url, requestOptions)
        .then((response) => console.log(response))
        .catch((error) => console.log("Form submit error", error));
    }
  };

  const onCaptchaChange = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    setCaptchaStatus(recaptchaValue);
  };

  if (userFromStore.userName === null) {
    return (
      <div className="mx-auto" style={{ width: "500px" }}>
        <h1>Signup</h1>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              setSpecialLoginDetails({
                ...specialLoginDetails,
                userName: e.target.value,
              })
            }
          />{" "}
          <br />
        </div>

        <div className="form-group">
          <label>Are You a Venue Owner?</label>
          <select
            className="form-control"
            onChange={(e) =>
              setSpecialLoginDetails({
                ...specialLoginDetails,
                isOwner: e.target.value,
              })
            }
          >
            <option value={undefined}>Select your option</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <br />
        </div>
        <div>
          <button onClick={() => handleSignUp()} className="btn btn-success">
            Login/SignUp
          </button>
        </div>
      </div>
    );
  } else {
    return <h1>You are already Logged In</h1>;
  }
};

export default SpecialLogin;
