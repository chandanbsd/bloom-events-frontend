import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PasswordReset = () => {
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const params = useParams();

  useEffect(() => {
    console.log(params.token);
  }, []);

  const passwordReset = () => {
    const url = "http://localhost:5000/password_reset";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        token: params.token,
      }),
    };

    if (password === confirmPassword) {
      fetch(url, requestOptions)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.status === "OK") {
            alert("Password Reset Sucessfully");
          } else {
            alert("Password Rest Failed. Try Requesting for a new link");
          }
        });
    } else {
      alert("Passwords Do Not Match");
    }
  };

  return (
    <div className="mx-auto" style={{ width: "500px" }}>
      <h1>Reset Password</h1>
      <br />
      <div className="form-group">
        <label>Password: </label>
        <input
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
      </div>
      <div className="form-group">
        <label>Confirm Password: </label>
        <input
          type="password"
          className="form-control"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
      </div>
      <div className=" form-group d-flex justify-content-around">
        <button onClick={() => passwordReset()} className="btn btn-danger">
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default PasswordReset;
