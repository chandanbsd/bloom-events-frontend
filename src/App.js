import { Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import Login from "./Login/Login.jsx";
import "./App.css";
import SignUp from "./SignUp/SignUp";
import EditProfile from "./EditProfile/EditProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login/signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit-profile" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default App;
