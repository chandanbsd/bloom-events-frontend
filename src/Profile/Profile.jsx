import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/user";
import { Link } from "react-router-dom";
import themeStyles from "../themeStyles";

const Profile = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [profileDetails, setProfileDetails] = useState({
    ...user,
  });

  const themeFromStore = useSelector((state) => state.theme);

  if (profileDetails.firstName !== null) {
    return (
      <div className={"mx-auto " + themeStyles[themeFromStore.value].body}>
        <div
          className={"mx-auto"}
          style={{ width: "500px", minHeight: "100vh" }}
        >
          <h1 className="text-center">Profile Details</h1>
          <br />
          <br />
          <ul
            className={
              "list-group  " +
              themeStyles[themeFromStore.value].bodyHeavy +
              " " +
              themeStyles[themeFromStore.value].text
            }
          >
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
              {profileDetails.isOwner ? "Yes" : "No"}
            </li>
            <li className="list-group-item">
              <b>Age Range: </b>
              {profileDetails.age}
            </li>
            <li className="list-group-item">
              <b>Gender: </b>
              {profileDetails.gender}
            </li>
            <li className="list-group-item">
              <b>Available for Events?: </b>
              {profileDetails.isAvailable}
            </li>
            <li className="list-group-item">
              <b>Bio?: </b>
              {profileDetails.bio}
            </li>
            <li className="list-group-item">
              <b>Favorite Category of Events: </b>
              {profileDetails.categoryType}
            </li>
            <li className="list-group-item">
              <b>Interest Level: </b>
              {profileDetails.categoryLevel}
            </li>
            <li className="list-group-item">
              <b>City: </b>
              {profileDetails.city}
            </li>
            <li className="list-group-item">
              <b>State: </b>
              {profileDetails.state}
            </li>
          </ul>
          <br />
          <br />
          <div className="text-center">
            <Link to="edit-profile" className="btn btn-danger ">
              Update Details
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Please Login First</div>;
  }
};

export default Profile;
