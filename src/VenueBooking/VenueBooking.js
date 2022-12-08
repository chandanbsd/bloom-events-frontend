import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import baseURL from "../constants/constants";
import { setProfile } from "../redux/user";
import { StripeContext } from "../Context/StripeContext";
import initialTimeSlot from "../constants/initalTimeSlot";
// import StripeHandler from "../StripePayment/StripeHandler";
import CheckoutForm from "../StripePayment/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import themeStyles from "../themeStyles";
import localForage from 'localforage';


const VenueBooking = () => {
  const location = useLocation();
  const [reservationDetails, setReservationDetails] = useState(null);

  const userFromStore = useSelector((state) => state.user);
  const urlParams = new URLSearchParams(window.location.search);
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
        activityImage: reservationDetails.activityImage,
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
        activityImage: reservationDetails.activityImage,
      })
    );
  };

  const navigate = useNavigate();

  const { clientSecret, options, stripePromise } = useContext(StripeContext);
  const themeFromStore = useSelector((state) => state.theme);

  useEffect(() => {
    if (location.state == undefined) {
      setReservationDetails(
        JSON.parse(localForage.getItem("venue-details-local"))
      );
      console.log(localForage.getItem("venue-details-local"));
    } else {
      localForage.setItem(
        "venue-details-local",
        JSON.stringify({ ...location.state })
      );
      console.log(localForage.getItem("venue-details-local"));
      setReservationDetails({ ...location.state });
    }
  }, []);

  return (
    <div className={themeStyles[themeFromStore.value].body}>
      <div className="mx-auto pt-5" style={{ width: "50%" }}>
        {reservationDetails && (
          <>
            <div
              className={
                "card mb-2 p-3 " +
                themeStyles[themeFromStore.value].bodyHeavy +
                " " +
                themeStyles[themeFromStore.value].text
              }
            >
              <div className="mx-auto">
                <h1>Payment Confirmation</h1>
              </div>
              <div className="mx-auto justify-content-between">
                <img
                  src={reservationDetails.activityImage}
                  alt="Activity"
                  style={{ width: "500px" }}
                />
                <div>
                  <b>Venue Name:</b> {reservationDetails.venueDetails.venueName}
                </div>
                <div>
                  <b>Venue Address:</b>{" "}
                  {reservationDetails.venueDetails.venueAddress}
                </div>
                <div>
                  <b>Venue Owner:</b>{" "}
                  {reservationDetails.venueDetails.venueOwner}
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
                <div>
                  {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm
                        email={userFromStore.email}
                        returnUrl={window.location.href}
                      />
                    </Elements>
                  )}
                </div>
                {/* <button
                className="btn btn-success"
                onClick={() => {
                  handleConfirmation();
                }}
              >
                Confirm Payment
              </button>
              <button className="btn btn-danger" onClick={() => navigate(-1)}>
                Cancel Booking
              </button> */}
                {urlParams.get("redirect_status") === "succeeded" ? (
                  <div className="text-center">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleConfirmation();
                      }}
                    >
                      Next
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => navigate(-1)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-warning mx-auto d-block">
                    Finish Payment to proceed
                  </button>
                )}
              </div>
            </div>
            {/* <div>
            <section style={{ width: "500px" }} className="mx-auto mt-5">
              <div className="card-body">
                <div className="description">
                  <h3>{reservationDetails.venueDetails.venueName}</h3>
                  <h5>
                    $
                    {reservationDetails.venueDetails.venueHrCost *
                      reservationDetails.selectedSlotList.length}
                  </h5>
                </div>
              </div>

              <a
            href="https://buy.stripe.com/test_6oEdUy0XI9BK0UMaEE"
            className="btn btn-primary"
          >
            Checkout
          </a>
            </section>
          </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default VenueBooking;
