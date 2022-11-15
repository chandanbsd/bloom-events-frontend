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
import { useDispatch, useSelector } from "react-redux";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import PasswordReset from "./PasswordReset/PasswordReset";
import VenueSearch from "./VenueSearch/VenueSearch";
import ActivitySearch from "./ActivitySearch/ActivitySearch";
import ParticipantSearch from "./ParticipantSearch/ParticipantSearch";
import SpecialLogin from "./SpecialLogin/SpecialLogin";
import SpecialSignup from "./SpecialSignup/SpecialSignup";
import VenueDetails from "./VenueDetails/VenueDetails";
import VenueBooking from "./VenueBooking/VenueBooking";
import ActivityDetails from "./ActivityDetails/ActivityDetails";
import UserCalendar from "./UserCalendar/UserCalendar";
import themeStyles from "./themeStyles";
import Bookmarks from "./Bookmarks/Bookmarks";
import VenueCreation from "./VenueCreation/VenueCreation";
import PaymentStripe from "./PaymentStripe/PaymentStripe";

function App() {
  const themeFromStore = useSelector((state) => state.theme);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login/signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit-profile" element={<EditProfile />} />
        <Route path="login/password-reset/:token" element={<PasswordReset />} />
        <Route path="venue-search" element={<VenueSearch />} />
        <Route path="activity-search" element={<ActivitySearch />} />
        <Route path="participant-search" element={<ParticipantSearch />} />
        <Route path="login/special-login" element={<SpecialLogin />} />
        <Route path="login/special-signup" element={<SpecialSignup />} />
        <Route
          path="/venue-search/venue-details/:token"
          element={<VenueDetails />}
        />
        <Route
          path="/venue-search/venue-details/:token/venue-booking"
          element={<VenueBooking />}
        />
        <Route
          path="/activity-search/activity-details/:token"
          element={<ActivityDetails />}
        />
        <Route path="/calendar" element={<UserCalendar />} />
        <Route path="/bookmarks" element={<Bookmarks />} />

        <Route path="/venue-creation" element={<VenueCreation />} />
        <Route path="/payment-stripe" element={<PaymentStripe />} />
      </Routes>
    </div>
  );
}

export default App;
