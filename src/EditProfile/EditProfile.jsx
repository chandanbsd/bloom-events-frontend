import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/user";
import baseURL from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { usCities, usStates } from "../constants/usaCityStates";
import themeStyles from "../themeStyles";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const themeFromStore = useSelector((state) => state.theme);

  const [profileDetails, setProfileDetails] = useState({
    ...user,
  });
  const navigate = useNavigate();
  useEffect(() => {
  }, [profileDetails]);

  const handleSignUp = () => {
    if (
      profileDetails.firstName === undefined ||
      profileDetails.firstName === ""
    ) {
      alert("Incorrect First Name");
    } else if (
      profileDetails.lastName === undefined ||
      profileDetails.lastName === ""
    ) {
      alert("Incorrect Last Name");
    } else if (
      profileDetails.email === undefined ||
      profileDetails.email === ""
    ) {
      alert("Incorrect Email");
    } else if (
      profileDetails.password === undefined ||
      profileDetails.password === ""
    ) {
      alert("Incorrect Password");
    } else if (
      profileDetails.gender === undefined ||
      profileDetails.gender === ""
    ) {
      alert("Choose your gender");
    } else if (profileDetails.bio === undefined || profileDetails.bio === "") {
      alert("Please enter your bio");
    } else if (
      profileDetails.categoryType === undefined ||
      profileDetails.categoryType === ""
    ) {
      alert("Choose your favorite category");
    } else if (
      profileDetails.categoryLevel === undefined ||
      profileDetails.categoryLevel === ""
    ) {
      alert("Choose your interest level");
    } else if (
      profileDetails.isAvailable === undefined ||
      profileDetails.isAvailable === ""
    ) {
      alert("Choose your availability");
    } else if (
      profileDetails.city === undefined ||
      profileDetails.city === ""
    ) {
      alert("Choose your city");
    } else if (
      profileDetails.state === undefined ||
      profileDetails.state === ""
    ) {
      alert("Choose your state");
    } else {
      const url = `${baseURL}/edit`;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileDetails),
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.status === "OK") {
            alert("Profile Update Sucessfull");
            dispatch(setProfile({ ...res.body }));
            navigate("/");
          } else alert("Error Updating Profile. Try Again");
        })
        .catch((error) => console.log("Form submit error", error));
    }
  };

  if (user.userName !== null) {
    return (
      <div className={themeStyles[themeFromStore.value].body}>
        <div className={"mx-auto"} style={{ width: "500px" }}>
          <h1>Update Profile</h1>

          <div className="form-group">
            <div className="form-group">
              <label>
                <b>Username: </b>
                {user.userName}
              </label>
              <br />
              <br />
            </div>
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  firstName: e.target.value,
                })
              }
              value={profileDetails.firstName}
            />{" "}
            <br />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  lastName: e.target.value,
                })
              }
              value={profileDetails.lastName}
            />{" "}
            <br />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              onChange={(e) =>
                setProfileDetails({ ...profileDetails, email: e.target.value })
              }
              value={profileDetails.email}
            />{" "}
            <br />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  password: e.target.value,
                })
              }
            />{" "}
            <br />
          </div>

          <div className="form-group">
            <label>Select Gender?</label>
            <select
              className="form-control"
              onChange={(e) =>
                setProfileDetails({ ...profileDetails, gender: e.target.value })
              }
              value={profileDetails.gender}
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
                setProfileDetails({ ...profileDetails, bio: e.target.value })
              }
              value={profileDetails.bio}
            />{" "}
            <br />
          </div>

          <div className="form-group">
            <label>Choose favorite category?</label>
            <select
              className="form-control"
              onChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  categoryType: e.target.value,
                })
              }
              value={profileDetails.categoryType}
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
                setProfileDetails({
                  ...profileDetails,
                  categoryLevel: e.target.value,
                })
              }
              value={profileDetails.categoryLevel}
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
                setProfileDetails({
                  ...profileDetails,
                  isAvailable: e.target.value,
                })
              }
              value={profileDetails.isAvailable}
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
            <label>Select City?</label>
            <select
              className="form-control"
              onChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  city: e.target.value,
                })
              }
              value={profileDetails.city}
            >
              <option value={undefined} defaultValue>
                Choose an option
              </option>
              {usCities.map((ele, index) => (
                <option value={ele} key={index}>
                  {ele}
                </option>
              ))}
            </select>
            <br />
          </div>

          <div className="form-group">
            <label>Select State?</label>
            <select
              className="form-control"
              onChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  state: e.target.value,
                })
              }
              value={profileDetails.state}
            >
              <option value={undefined} defaultValue>
                Choose an option
              </option>
              {usStates.map((ele, index) => (
                <option value={ele} key={index}>
                  {ele}
                </option>
              ))}
            </select>
            <br />
          </div>

          <div className="form-group">
            <label>Select Age Range?</label>
            <select
              className="form-control"
              onChange={(e) =>
                setProfileDetails({
                  ...profileDetails,
                  age: e.target.value,
                })
              }
              value={profileDetails.age}
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
            <button onClick={() => handleSignUp()} className="btn btn-success">
              Update
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Please Login First</div>;
  }
};

export default EditProfile;
