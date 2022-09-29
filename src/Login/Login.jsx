import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/user";
import "./login.css";

const Login = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [loginDetails, setloginDetails] = useState({});
  useEffect(() => {}, [loginDetails]);

  const handleLogin = () => {
    if (loginDetails.userName === undefined) {
      alert("Incorrect Username");
    } else if (loginDetails.password === undefined) {
      alert("Incorrect Password");
    } else {
      console.log(JSON.stringify(loginDetails));
      const url = "/login";
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res.response);
          dispatch(setProfile({ ...res.response }));
        })
        .catch((error) => console.log("Form submit error", error));
    }
  };
  if (user.username == null) {
    return (
      <div className="form">
        Login
        <div>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) =>
              setloginDetails({ ...loginDetails, userName: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) =>
              setloginDetails({ ...loginDetails, password: e.target.value })
            }
          />{" "}
          <br />
        </div>
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  } else {
    return <h1>{user.firstName} is already logged In</h1>;
  }
};

export default Login;
