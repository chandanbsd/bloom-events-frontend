import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/user";
import baseURL from "../constants/constants";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [profileDetails, setProfileDetails] = useState({
    ...user,
  });
  const navigate = useNavigate();
  useEffect(() => {}, [profileDetails]);

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
      profileDetails.isOwner === undefined ||
      profileDetails.isOwner === ""
    ) {
      alert("Choose if you are a venue owner?");
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
          console.log("From backend", res.status, res.body);
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
      <div className="mx-auto" style={{ width: "500px" }}>
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
          />{" "}
          <br />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              setProfileDetails({ ...profileDetails, lastName: e.target.value })
            }
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
          />{" "}
          <br />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) =>
              setProfileDetails({ ...profileDetails, password: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div className="form-group">
          <label>Are You a Venue Owner?</label>
          <select
            className="form-control"
            onChange={(e) =>
              setProfileDetails({ ...profileDetails, isOwner: e.target.value })
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
            Update
          </button>
        </div>
      </div>
    );
  } else {
    return <div>Please Login First</div>;
  }
};

export default EditProfile;
