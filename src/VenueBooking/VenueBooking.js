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
  const userFromStore = useSelector((state) => state.user);

  const handleConfirmation = () => {
    console.log(reservationDetails.formattedReservationDate);
    let venueSlots = {};
    if (
      reservationDetails.formattedReservationDate in
      reservationDetails.venueDetails.venueSlots
    ) {
      venueSlots[reservationDetails.formattedReservationDate] =
        reservationDetails.venueDetails.venueSlots[
          reservationDetails.formattedReservationDate
        ].map((val) => {
          if (val in reservationDetails.selectedSlotList) {
            return "reserved";
          }
          return "open";
        });
    } else {
      venueSlots[reservationDetails.formattedReservationDate] = [
        ...initialTimeSlot,
      ];
      venueSlots[reservationDetails.formattedReservationDate] = venueSlots[
        reservationDetails.formattedReservationDate
      ].map((val) => {
        if (val in reservationDetails.selectedSlotList) {
          return "reserved";
        }
        return "open";
      });
    }
    // const url = `${baseURL}/venue-booking`;
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    // activityName:reservationDetails.activityName,
    // activityDescription:reservationDetails.activityDescription,
    //  activityCapacity:reservationDetails.activityCapacity,
    //  activityLocation:reservationDetails.activityLocation,
    // activityCategory: reservationDetails.activityCategory,
    // activityAgeRange: reservationDetails.activityAgeRange,
    //     activityOrganizer: userFromStore.userName,
    //     activityVenueOwner: reservationDetails.venueDetails.venueOwner,
    //     activityVenueId: reservationDetails.venueDetails.venueId,
    //  activityCost: reservationDetails.activityCost,
    //     venueSlots: venueSlots,
    //     totalCost: reservationDetails.venueDetails.venueHrCost*reservationDetails.selectedSlotList.length
    //   }),
    // };
    // fetch(url, requestOptions).then((response) => response.json());

    console.log(
      reservationDetails.activityName,
      reservationDetails.activityDescription,
      reservationDetails.activityCapacity,
      reservationDetails.activityLocation,
      reservationDetails.activityCategory,
      reservationDetails.activityAgeRange,
      userFromStore.userName,
      reservationDetails.venueDetails.venueId,
      venueSlots,
      reservationDetails.venueDetails.venueHrCost *
        reservationDetails.selectedSlotList.length,
      reservationDetails.activityCost
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log(reservationDetails);

    console.log(
      reservationDetails.activityName,
      reservationDetails.activityDescription,
      reservationDetails.activityCapacity,
      reservationDetails.activityLocation,
      reservationDetails.activityCategory,
      reservationDetails.activityAgeRange,
      userFromStore.userName,
      reservationDetails.venueDetails.venueId,
      reservationDetails.venueDetails.venueHrCost *
        reservationDetails.selectedSlotList.length,
      reservationDetails.activityCost
    );
    // console.log(reservationDetails);
  }, []);

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
            <b>Organizer Username:</b>{" "}
            {reservationDetails.venueDetails.venueOwner}
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
            onClick={() => handleConfirmation()}
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
