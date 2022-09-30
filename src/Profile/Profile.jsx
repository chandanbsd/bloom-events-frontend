import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      <div className="mx-auto" style={{ width: "500px" }}>
        <h1>Profile Details</h1>
        <br />
        <br />
        <ul className="list-group">
          <li className="list-group-item">
            <b>Username:</b> {profileDetails.userName}
          </li>
          <li className="list-group-item">
            <b>First Name:</b> {profileDetails.firstName}
          </li>
          <li className="list-group-item">
            <b>Last Name:</b> {profileDetails.lastName}
          </li>
          <li className="list-group-item">
            <b>Email:</b> {profileDetails.email}
          </li>
          <li className="list-group-item">
            <b>Are You a Venue Owner?: </b>
            {profileDetails.email}
          </li>
        </ul>
        <br />
        <br />
        <div>
          <Link to="edit-profile" className="btn btn-danger">
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
