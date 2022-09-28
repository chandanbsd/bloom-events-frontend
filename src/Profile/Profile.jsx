import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/user";

const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();

  return (
    <div>
      Profile
      <button
        onClick={(mockUser) => {
          dispatch(
            setProfile(["Chandan", "Chandan", "Chandan", "Chandan", false])
          );
          console.log(user);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Profile;
