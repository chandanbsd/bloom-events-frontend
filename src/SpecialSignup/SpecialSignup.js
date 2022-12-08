import React, { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/user";
import baseURL from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { usaCityStates, usCities, usStates } from "../constants/usaCityStates";
import { useAuth0 } from "@auth0/auth0-react";
import themeStyles from "../themeStyles";
import { firebaseAuthObj } from "../constants/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SpecialSignup = () => {
  const userFromStore = useSelector((state) => state.user);
  const [captchaStatus, setCaptchaStatus] = useState(false);
  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();

  const dispatch = useDispatch();
  const recaptchaRef = useRef();
  const [specialSignUpDetails, setSignUpDetails] = useState(
    JSON.parse(localStorage.getItem("specialLoginDetails"))
  );
  const navigate = useNavigate();
  const themeFromStore = useSelector((state) => state.theme);

  useEffect(() => {}, [specialSignUpDetails]);

  const handleSpecialSignUp = () => {
    if (specialSignUpDetails.userName === undefined) {
      alert("Incorrect Username");
    } else if (captchaStatus === false) {
      alert("Captcha Failed, Please try again");
    } else if (specialSignUpDetails.isOwner === undefined) {
      alert("Choose if you are a venue owner");
    } else if (specialSignUpDetails.gender === undefined) {
      alert("Choose your gender");
    } else if (specialSignUpDetails.bio === undefined) {
      alert("Please enter your bio");
    } else if (specialSignUpDetails.categoryType === undefined) {
      alert("Choose your favorite category");
    } else if (specialSignUpDetails.categoryLevel === undefined) {
      alert("Choose your interest level");
    } else if (specialSignUpDetails.isAvailable === undefined) {
      alert("Choose your availability");
    } else if (specialSignUpDetails.city === undefined) {
      alert("Choose your city");
    } else if (specialSignUpDetails.age === undefined) {
      alert("Choose your age range");
    } else if (specialSignUpDetails.state === undefined) {
      alert("Choose your state");
    } else {
      localStorage.removeItem("specialLoginDetails");
      localStorage.setItem(
        "specialLoginDetails",
        JSON.stringify(specialSignUpDetails)
      );



      loginWithRedirect();
    }
  };

  const onCaptchaChange = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    setCaptchaStatus(recaptchaValue);
  };

  if (userFromStore.userName === null) {
    return (
      <div className={themeStyles[themeFromStore.value].body}>
        <div className="mx-auto" style={{ width: "500px" }}>
          <h1>Signup</h1>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) =>
                setSignUpDetails({
                  ...specialSignUpDetails,
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
                setSignUpDetails({
                  ...specialSignUpDetails,
                  isOwner: e.target.value,
                })
              }
            >
              <option value={undefined} defaultValue>
                Choose an option?
              </option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <br />
          </div>

          <div className="form-group">
            <label>Select Gender?</label>
            <select
              className="form-control"
              onChange={(e) =>
                setSignUpDetails({
                  ...specialSignUpDetails,
                  gender: e.target.value,
                })
              }
            >
              <option value={undefined} defaultValue>
                Choose an option
              </option>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </select>
            <br />
          </div>

          <div className="form-group">
            <label>Bio:</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) =>
                setSignUpDetails({
                  ...specialSignUpDetails,
                  bio: e.target.value,
                })
              }
            />{" "}
            <br />
          </div>

          <div className="form-group">
            <label>Choose favorite category?</label>
            <select
              className="form-control"
              onChange={(e) =>
                setSignUpDetails({
                  ...specialSignUpDetails,
                  categoryType: e.target.value,
                })
              }
            >
              <option value={undefined} defaultValue>
                Choose an option
              </option>
              <option value={"Music"}>Music</option>
              <option value={"Sports"}>Sports</option>
              <option value={"Comedy"}>Comedy</option>
            </select>
            <br />
          </div>

          <div className="form-group">
            <label>Choose Interest Level?</label>
            <select
              className="form-control"
              onChange={(e) =>
                setSignUpDetails({
                  ...specialSignUpDetails,
                  categoryLevel: e.target.value,
                })
              }
            >
              <option value={undefined} defaultValue>
                Choose an option
              </option>
              <option value={"Beginner"}>Beginner</option>
              <option value={"Intermediate"}>Intermediate</option>
              <option value={"Advanced"}>Advanced</option>
            </select>
            <br />
          </div>

          <div className="form-group">
            <label>Available to join events?</label>
            <select
              className="form-control"
              onChange={(e) =>
                setSignUpDetails({
                  ...specialSignUpDetails,
                  isAvailable: e.target.value,
                })
              }
            >
              <option value={undefined} defaultValue>
                Choose an option
              </option>
              <option value={"Yes"}>Yes</option>
              <option value={"No"}>No</option>
            </select>
            <br />
          </div>

          

          <div className="form-group">
            <label>Select State: </label>
            <select
              className="form-control"
              onChange={(e) => {
                setSignUpDetails({
                  ...specialSignUpDetails,
                  state: e.target.value,
                });
              }}
            >
              {usStates.map((ele, index) => (
                <option value={ele} key={index}>
                  {ele}
                </option>
              ))}
            </select>
            <br />
          </div>

          <div className="form-group">
            <label>Select City: </label>
            {specialSignUpDetails!==null && specialSignUpDetails.state != null ? (
              <select
                className="form-control"
                onChange={(e) => {
                  setSignUpDetails({
                    ...specialSignUpDetails,
                    city: e.target.value,
                  });
                }}
              >
                {usaCityStates[specialSignUpDetails.state].map((ele, index) => {
                  return (
                    <option value={ele} key={index}>
                      {ele}
                    </option>
                  );
                })}
              </select>
            ) : (
              <div>Select state first</div>
            )}
          </div>
          <br/>
          <div className="form-group">
            <label>Select Age Range?</label>
            <select
              className="form-control"
              onChange={(e) =>
                setSignUpDetails({
                  ...specialSignUpDetails,
                  age: e.target.value,
                })
              }
            >
              <option value={undefined} defaultValue>
                Choose an option
              </option>

              <option value={"A65"}>Above 65</option>
              <option value={"A18"}>Above 18</option>
              <option value={"B18"}>Below 18</option>
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
          <div className=" form-group d-flex justify-content-around pb-5">
            <button
              onClick={() => handleSpecialSignUp()}
              className="btn btn-info mt-2"
            >
              Signup With OAuth
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>You are already Logged In</h1>;
  }
};

export default SpecialSignup;
