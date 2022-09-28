import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import "./profile.css";
import { setProfile } from "../redux/user";

const Profile = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // const [signUpDetails, setSignUpDetails] = useState({
  //   firstName: null,
  //   lastName: null,
  //   email: null,
  //   userName: null,
  //   password: null,
  //   isOwner: null,
  // });

  const [profileDetails, setProfileDetails] = useState({
    ...user,
  });
  useEffect(() => {
    console.log(profileDetails);
  }, [profileDetails]);

  const handleProfileUpdate = () => {
    if (profileDetails.firstName == "") {
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
      //   dispatch(
      //     setProfile([
      //       signUpDetails.firstName,
      //       signUpDetails.lastName,
      //       signUpDetails.email,
      //       signUpDetails.userName,
      //       signUpDetails.password,
      //       signUpDetails.password,
      //     ])
      //   );

      dispatch(setProfile({ ...profileDetails }));
    }
  };
  if (profileDetails.firstName !== null) {
    return (
      <div className="form">
        Edit Profile
        {/* <Form> */}
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={profileDetails.firstName}
            onChange={(e) =>
              setProfileDetails({
                ...profileDetails,
                firstName: e.target.value,
              })
            }
          />{" "}
          <br />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={profileDetails.lastName}
            onChange={(e) =>
              setProfileDetails({ ...profileDetails, lastName: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={profileDetails.email}
            onChange={(e) =>
              setProfileDetails({ ...profileDetails, email: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={profileDetails.userName}
            onChange={(e) =>
              setProfileDetails({ ...profileDetails, userName: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={profileDetails.password}
            onChange={(e) =>
              setProfileDetails({ ...profileDetails, password: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div>
          <label>Are You a Venue Owner?</label>
          <select
            value={profileDetails.isOwner}
            onChange={(e) =>
              setProfileDetails({ ...profileDetails, isOwner: e.target.value })
            }
          >
            <option value={undefined}>Select your option</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          {/* <label>
        <input
          type="radio"
          value="Yes"
          onChange={(e) =>
            setSignUpDetails({ ...signUpDetails, isOwner: e.target.value })
          }
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          value="No"
          onChange={(e) =>
            setSignUpDetails({ ...signUpDetails, isOwner: e.target.value })
          }
        />{" "}
        No
      </label> */}
          <br />
        </div>
        <div>
          <button onClick={() => handleProfileUpdate()}>Update Details</button>
        </div>
        {/* </Form> */}
      </div>
    );
  } else {
    return <div>Please Login First</div>;
  }
};

export default Profile;
