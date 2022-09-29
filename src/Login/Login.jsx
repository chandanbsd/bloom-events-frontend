import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProfile } from "../redux/user";

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
      <div className="mx-auto" style={{ width: "500px" }}>
        <h1>Login</h1>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) =>
              setloginDetails({ ...loginDetails, userName: e.target.value })
            }
          />
          <br />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            className="form-control"
            onChange={(e) =>
              setloginDetails({ ...loginDetails, password: e.target.value })
            }
          />
          <br />
        </div>
        <div className="form-group" style={{ width: "500px" }}>
          <button onClick={handleLogin} className="btn btn-success">
            Login
          </button>
          <Link to="signup" className="btn btn-primary">
            Signup
          </Link>{" "}
        </div>
      </div>
    );
  } else {
    return <h1>{user.firstName} is already logged In</h1>;
  }
};

export default Login;
