import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/user";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [profileDetails, setProfileDetails] = useState({
    ...user,
  });
  useEffect(() => {}, [profileDetails]);

  const handleSignUp = () => {
    if (profileDetails.firstName === undefined) {
      alert("Incorrect First Name");
    } else if (profileDetails.lastName === undefined) {
      alert("Incorrect Last Name");
    } else if (profileDetails.email === undefined) {
      alert("Incorrect Email");
    } else if (profileDetails.password === undefined) {
      alert("Incorrect Password");
    } else if (profileDetails.isOwner === undefined) {
      alert("Choose if you are a venue owner?");
    } else {
      dispatch(setProfile({ ...profileDetails }));
      console.log(JSON.stringify(profileDetails));
      const url = "/edit";
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileDetails),
      };
      fetch(url, requestOptions)
        .then((response) => console.log(response))
        .then((response) => response.json())
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
