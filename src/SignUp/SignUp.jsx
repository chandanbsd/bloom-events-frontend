import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./signup.css";
import { setProfile } from "../redux/user";

const SignUp = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [signUpDetails, setSignUpDetails] = useState({});
  useEffect(() => {}, [signUpDetails]);

  const handleSignUp = () => {
    if (signUpDetails.firstName === undefined) {
      alert("Incorrect First Name");
    } else if (signUpDetails.lastName === undefined) {
      alert("Incorrect Last Name");
    } else if (signUpDetails.email === undefined) {
      alert("Incorrect Email");
    } else if (signUpDetails.userName === undefined) {
      alert("Incorrect Username");
    } else if (signUpDetails.password === undefined) {
      alert("Incorrect Password");
    } else if (signUpDetails.isOwner === undefined) {
      alert("Choose if you are a venue owner?");
    } else {
      dispatch(setProfile({ ...signUpDetails }));
      console.log(JSON.stringify(signUpDetails));
      const url = "/register";
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpDetails),
      };
      fetch(url, requestOptions)
        .then((response) => console.log(response))
        .catch((error) => console.log("Form submit error", error));
    }
  };

  if (user.userName === null) {
    return (
      <div className="form">
        Signup
        <div>
          <label>First Name</label>
          <input
            type="text"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, firstName: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, lastName: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, email: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, userName: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, password: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div>
          <label>Are You a Venue Owner?</label>
          <select
            onChange={(e) =>
              setSignUpDetails({ ...signUpDetails, isOwner: e.target.value })
            }
          >
            <option value={undefined}>Select your option</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <br />
        </div>
        <div>
          <button onClick={() => handleSignUp()}>SignUp</button>
        </div>
      </div>
    );
  } else {
    return <h1>You are already Logged In</h1>;
  }
};

export default SignUp;
