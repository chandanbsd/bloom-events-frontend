import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import baseURL from "../constants/constants";
import { setProfile } from "../redux/user";

import initialTimeSlot from "../constants/initalTimeSlot";
const VenueBooking = () => {
  const location = useLocation();
  const [reservationDetails, setReservationDetails] = useState({
    ...location.state,
  });

  console.log({ ...location.state });
  const userFromStore = useSelector((state) => state.user);

  const handleConfirmation = () => {
    const newSlots = reservationDetails.availableTimeSlot.map((val, index) => {
      if (reservationDetails.selectedSlotList.includes(index)) {
        return ["reserved", -1];
      } else return [val[0], val[1]];
    });

    const url = `${baseURL}/venuebooking`;

    let resSlots = "";
    for (let [key, val] of newSlots) {
      resSlots += key + "/" + val + ",";
    }
    resSlots = resSlots.slice(0, resSlots.length - 1);

    const venueSlotObject = {};

    venueSlotObject[reservationDetails.formattedReservationDate] = resSlots;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activityName: reservationDetails.activityName,
        activityDescription: reservationDetails.activityDescription,
        activityCapacity: reservationDetails.activityCapacity,
        activityLocation: reservationDetails.activityLocation,
        activityCategory: reservationDetails.activityCategory,
        activityAgeRange: reservationDetails.activityAgeRange,
        activityCost: reservationDetails.activityCost,
        activityCostAmount: reservationDetails.activityCostAmount,
        activityVenueId: reservationDetails.venueDetails.venueId,
        activityVenueCost:
          reservationDetails.venueDetails.venueHrCost *
          reservationDetails.selectedSlotList.length,
        activityTime: JSON.stringify(reservationDetails.selectedSlotList),
        activityDate: reservationDetails.formattedReservationDate,
        activityBookingDate: new Date(),
        venueSlots: venueSlotObject,
        activityOrganizer: userFromStore.userName,
        activityRemainingCapacity: reservationDetails.activityCapacity,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status == "OK") {
          console.log(res);
          alert("Booking Sucessfull");
          navigate(`/venue-search`);
        }
      });

    console.log(
      JSON.stringify({
        activityName: reservationDetails.activityName,
        activityDescription: reservationDetails.activityDescription,
        activityCapacity: reservationDetails.activityCapacity,
        activityLocation: reservationDetails.activityLocation,
        activityCategory: reservationDetails.activityCategory,
        activityAgeRange: reservationDetails.activityAgeRange,
        activityCost: reservationDetails.activityCost,
        activityCostAmount: reservationDetails.activityCostAmount,
        activityVenueId: reservationDetails.venueDetails.venueId,
        activityVenueCost:
          reservationDetails.venueDetails.venueHrCost *
          reservationDetails.selectedSlotList.length,
        activityTime: JSON.stringify(reservationDetails.selectedSlotList),
        activityDate: reservationDetails.formattedReservationDate,
        activityBookingDate: new Date(),
        venueSlots: venueSlotObject,
        activityOrganizer: userFromStore.userName,
        activityRemainingCapacity: reservationDetails.activityCapacity,
      })
    );
  };

  const navigate = useNavigate();

  return (
    <div className="mx-auto mt-5" style={{ width: "50%" }}>
      <div className="card mb-2 p-3">
        <div className="mx-auto">
          <h1>Payment Confirmation</h1>
        </div>
        <div className="mx-auto justify-content-between">
          <div>
            <b>Venue Name:</b> {reservationDetails.venueDetails.venueName}
          </div>
          <div>
            <b>Venue Address:</b> {reservationDetails.venueDetails.venueAddress}
          </div>
          <div>
            <b>Venue Owner:</b> {reservationDetails.venueDetails.venueOwner}
          </div>
          <div>
            <b>Organizer Username:</b> {userFromStore.userName}
          </div>
          <div>
            <b>Selected time slots:</b>{" "}
            <ul>
              {reservationDetails.selectedSlotList.map((val) => (
                <li key={val}>{reservationDetails.timeSlots[val]}</li>
              ))}
            </ul>
          </div>
          <div>
            <b>Cost:</b>{" "}
            {reservationDetails.venueDetails.venueHrCost *
              reservationDetails.selectedSlotList.length}
          </div>
          <button
            className="btn btn-success"
            onClick={() => {
              handleConfirmation();
            }}
          >
            Confirm Payment
          </button>
          <button className="btn btn-danger" onClick={() => navigate(-1)}>
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueBooking;
