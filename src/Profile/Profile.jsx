import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./profile.css";
import { setProfile } from "../redux/user";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [profileDetails, setProfileDetails] = useState({
    ...user,
  });
  useEffect(() => {
    console.log(profileDetails);
  }, [profileDetails]);

  const handleProfileUpdate = () => {
    if (profileDetails.firstName === "") {
      alert("Incorrect First Name");
    } else if (profileDetails.lastName === "") {
      alert("Incorrect Last Name");
    } else if (profileDetails.email === "") {
      alert("Incorrect Email");
    } else if (profileDetails.userName === "") {
      alert("Incorrect Username");
    } else if (profileDetails.password === "") {
      alert("Incorrect Password");
    } else if (profileDetails.isOwner === "") {
      alert("Choose if you are a venue owner?");
    } else {
      dispatch(setProfile({ ...profileDetails }));
    }
  };
  if (profileDetails.firstName !== null) {
    return (
      <div className="form">
        <h1>
          {" "}
          Hello, {profileDetails.firstName} {profileDetails.lastName}
        </h1>

        <div>
          <label>Username: {profileDetails.userName}</label>
        </div>
        <div>
          <label>First Name: {profileDetails.firstName}</label>
        </div>

        <div>
          <label>Last Name: {profileDetails.lastName}</label>
          <br />
        </div>
        <div>
          <label>Email: {profileDetails.email}</label>
          <br />
        </div>
        <div>
          <label>
            Are You a Venue Owner?: {profileDetails.isOwner ? "Yes" : "No"}
          </label>
        </div>
        <div>
          <Link to="edit-profile" className="nav-item">
            Update Details
          </Link>
        </div>
      </div>
    );
  } else {
    return <div>Please Login First</div>;
  }
};

export default Profile;
