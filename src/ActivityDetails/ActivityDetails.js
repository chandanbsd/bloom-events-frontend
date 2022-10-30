import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activity } from "../redux/activity";
import baseURL from "../constants/constants";
import venueListMock from "../Mocks/venueListMock";
// import venueListMock from "../Mocks/activityDetailsMock";
import "react-calendar/dist/Calendar.css";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import activityListMock from "../Mocks/activityListMock";

const ActivityDetails = () => {
  const activityFromStore = useSelector((state) => state.activity);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const userFromStore = useSelector((state) => state.user);

  const [activityDetails, setActivityDetails] = useState(null);
  const [venueDetails, setVenueDetails] = useState(null);

  const handleActivityRegistration = () => {
    const url = `${baseURL}/activityregistration`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activityId: activityDetails.activityId,
        userName: userFromStore.userName,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
        } else alert("Failed to signup for activity. Try again");
      })
      .catch((error) => console.log("API Connection Failed", error));
  };

  useEffect(() => {
    if (activityDetails === null) {
      setActivityDetails(
        [...JSON.parse(JSON.stringify(activityListMock))].filter(
          (val) => val.activityId === params.token
        )[0]
      );
    }

    if (activityDetails !== null && venueDetails === null) {
      setVenueDetails(
        [...JSON.parse(JSON.stringify(venueListMock))].filter(
          (val) => val.venueId === activityDetails.activityVenueId
        )[0]
      );
    }
  }, [activityDetails, venueDetails]);

  return (
    <div>
      {activityDetails !== null && venueDetails !== null ? (
        <div>
          <h1 className="mx-auto" style={{ width: "fit-content" }}>
            Activity Name: {activityDetails.activityName}
          </h1>
          <div className="mx-auto mt-5" style={{ width: "50%" }}>
            <div className="card mb-2 p-3">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <p className="card-text">
                    <b>Description:</b> {activityDetails.activityDescription}
                  </p>
                  <p className="card-text">
                    <b>Capacity:</b> {activityDetails.activityCapacity}
                  </p>
                  <p className="card-text">
                    <b>Location:</b> {activityDetails.activityLocation}
                  </p>
                  <p className="card-text">
                    <b>Category:</b> {activityDetails.activityCategory}
                  </p>
                  <p className="card-text">
                    <b>Age Range:</b> {activityDetails.activityAgeRange}
                  </p>
                  <p className="card-text">
                    <b>Cost:</b> {activityDetails.activityCostAmount}
                  </p>
                  <p className="card-text">
                    <b>Venue Name:</b> {venueDetails.venueName}
                  </p>
                  <p className="card-text">
                    <b>Venue Name:</b> {venueDetails.venueAddress}
                  </p>
                  <p className="card-text">
                    <b>City:</b> {venueDetails.venueCity}
                  </p>
                  <p className="card-text">
                    <b>State:</b> {venueDetails.venueState}
                  </p>

                  <p className="card-text">
                    <b>Remaining Capacity:</b>{" "}
                    {activityDetails.activityRemainingCapacity}
                  </p>

                  {/* <img className="card-img-top" alt="Card Image" /> */}
                </div>
              </div>

              <div>
                <div colSpan={2}>
                  <div className="text-center">
                    <button
                      className={
                        "btn " +
                        (activityDetails.activityRemainingCapacity > 0
                          ? "btn-primary"
                          : "btn-danger")
                      }
                      onClick={handleActivityRegistration}
                    >
                      {activityDetails.activityRemainingCapacity > 0
                        ? "Confirm Booking"
                        : "Activity has reached maximum capacity"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div> Loading</div>
      )}
    </div>
  );
};

export default ActivityDetails;
