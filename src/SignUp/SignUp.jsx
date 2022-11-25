import React, { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/user";
import baseURL from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { usCities, usStates, usaCityStates } from "../constants/usaCityStates";

const SignUp = () => {
  const user = useSelector((state) => state.user);
  const [captchaStatus, setCaptchaStatus] = useState(false);

  const dispatch = useDispatch();
  const recaptchaRef = useRef();
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: null,
    lastName: null,
    email: null,
    userName: null,
    password: null,
    isOwner: null,
    gender: null,
    bio: null,
    categoryType: null,
    categoryLevel: null,
    isAvailable: null,
    city: null,
    state: null,
    age: null,
  });

  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {

    setLoadingPage(false);
  }, [signUpDetails]);

  const handleSignUp = () => {
    if (signUpDetails.firstName === null) {
      alert("Incorrect First Name");
    } else if (signUpDetails.lastName === null) {
      alert("Incorrect Last Name");
    } else if (signUpDetails.email === null) {
      alert("Incorrect Email");
    } else if (signUpDetails.userName === null) {
      alert("Incorrect Username");
    } else if (signUpDetails.password === null) {
      alert("Incorrect Password");
    } else if (captchaStatus === false) {
      alert("Captcha Failed, Please try again");
    } else if (signUpDetails.isOwner === null) {
      alert("Choose if you are a venue owner");
    } else if (signUpDetails.gender === null) {
      alert("Choose your gender");
    } else if (signUpDetails.bio === null) {
      alert("Please enter your bio");
    } else if (signUpDetails.categoryType === null) {
      alert("Choose your favorite category");
    } else if (signUpDetails.categoryLevel === null) {
      alert("Choose your interest level");
    } else if (signUpDetails.isAvailable === null) {
      alert("Choose your availability");
    } else if (signUpDetails.city === null) {
      alert("Choose your city");
    } else if (signUpDetails.age === null) {
      alert("Choose your age");
    } else if (signUpDetails.state === null) {
      alert("Choose your state");
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
    return loadingPage == false ? (
      <div className="mx-auto" style={{ width: "500px" }}>
        <h1>Signup</h1>

        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              setSignUpDetails({
                ...signUpDetails,
                firstName: e.target.value,
              })
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
            <option value={null} defaultValue>
              Choose an option:
            </option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <br />
        </div>

        <div className="form-group">
          <label>Select Gender: </label>
          <select
            className="form-control"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, gender: e.target.value })
            }
          >
            <option value={null} defaultValue>
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
              setSignUpDetails({ ...signUpDetails, bio: e.target.value })
            }
          />{" "}
          <br />
        </div>

        <div className="form-group">
          <label>Choose favorite category: </label>
          <select
            className="form-control"
            onChange={(e) =>
              setSignUpDetails({
                ...signUpDetails,
                categoryType: e.target.value,
              })
            }
          >
            <option value={null} defaultValue>
              Choose an option
            </option>
            <option value={"Music"}>Music</option>
            <option value={"Sports"}>Sports</option>
            <option value={"Comedy"}>Comedy</option>
          </select>
          <br />
        </div>

        <div className="form-group">
          <label>Choose Interest Level: </label>
          <select
            className="form-control"
            onChange={(e) =>
              setSignUpDetails({
                ...signUpDetails,
                categoryLevel: e.target.value,
              })
            }
          >
            <option value={null} defaultValue>
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
                ...signUpDetails,
                isAvailable: e.target.value,
              })
            }
          >
            <option value={null} defaultValue>
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
                ...signUpDetails,
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

        {/* <div className="form-group">
          <label>Select City: </label>
          <select
            className="form-control"
            onChange={(e) => {
              setSignUpDetails({
                ...signUpDetails,
                city: e.target.value,
              });
            }}
          >
            {usaCityStates[signUpDetails.state].map((ele, index) => (
              <option value={ele} key={index}>
                {ele}
              </option>
            ))}
          </select>
        </div> */}

        <div className="form-group">
                <label>Select City: </label>
                {signUpDetails.state != null ? (
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setSignUpDetails({
                        ...signUpDetails,
                        city: e.target.value,
                      });
                    }}
                  >
                    {usaCityStates[signUpDetails.state].map(
                      (ele, index) => {
                        return (
                          <option value={ele} key={index}>
                            {ele}
                          </option>
                        );
                      }
                    )}
                  </select>
                ) : (
                  <div>Select state first</div>
                )}
                </div>
        <br />
        <div className="form-group">
          <label>Select Age Range?</label>
          <select
            className="form-control"
            onChange={(e) =>
              setSignUpDetails({
                ...signUpDetails,
                age: e.target.value,
              })
            }
          >
            <option value={null} defaultValue>
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
        <div>
          <button onClick={() => handleSignUp()} className="btn btn-success">
            SignUp
          </button>
        </div>
      </div>
    ) : (
      <div>Loading Form</div>
    );
  } else {
    return <h1>You are already Logged In</h1>;
  }
};

export default SignUp;
