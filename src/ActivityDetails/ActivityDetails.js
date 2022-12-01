import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activity } from "../redux/activity";
import baseURL from "../constants/constants";
import "react-calendar/dist/Calendar.css";
import { clearActivity, setActivity } from "../redux/activity";
import ReactStars from "react-rating-stars-component";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../StripePayment/CheckoutForm";
import { StripeContext } from "../Context/StripeContext";

const ActivityDetails = () => {
  const activityFromStore = useSelector((state) => state.activity);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const userFromStore = useSelector((state) => state.user);
  const eventFromStore = useSelector((state) => state.event);

  const [activityDetails, setActivityDetails] = useState(null);
  const [venueDetails, setVenueDetails] = useState(null);
  const [registeredActivities, setRegisteredActivities] = useState(null);

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);

  const [activityReview, setActivityReview] = useState(null);
  const [participantList, setParticipantList] = useState(null);

  const [activityBookmarks, setActivityBookmarks] = useState(null);
  const [venueBookmarks, setVenueBookmarks] = useState(null);

  // const [paymentCreds, setPaymentCreds] = useState({
  //   cardNumber: null,
  //   cvv: null,
  //   expiry: null,
  // });

  const { clientSecret, options, stripePromise } = useContext(StripeContext);
  const urlParams = new URLSearchParams(window.location.search);

  const updateActivityStore = () => {
    const url = `${baseURL}/ra`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        if (res.status === "OK") {
          dispatch(setActivity([...res.body]));
          setActivityDetails(
            [
              ...JSON.parse(JSON.stringify(activityFromStore.activityList)),
            ].filter((val) => val.activityId == params.token)[0]
          );
        } else alert("Unable to fetch activities");
      });
  };
  const handleActivityRegistration = () => {
    let url = `${baseURL}/activityPayment`;
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activityId: activityDetails.activityId,
        participantuserName: userFromStore.userName,
        organizeruserName: activityDetails.activityOrganizer,
        amount: activityDetails.activityCostAmount,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          url = `${baseURL}/RegActivity`;
          requestOptions = {
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
                updateActivityStore();
                alert("Booking Confirmed");
                window.location.reload();
              } else alert("Failed to signup for activity. Try again");
            })
            .catch((error) => console.log("API Connection Failed", error));
        } else
          alert(
            "Failed to signup for activity. You may have already registered"
          );
      })
      .catch((error) => console.log("API Connection Failed", error));

    updateActivityStore();
  };

  const handleReviewSubmit = () => {
    const url = `${baseURL}/insertreview`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activityId: activityDetails.activityId,
        userName: userFromStore.userName,
        review: review,
        rating: stars,
      }),
    };
    fetch(url, requestOptions).then((response) => response.json());

    handleActivityReviews();
    window.location.reload();
  };

  const handleActivityCancellation = () => {
    const url = `${baseURL}/CancelActivity`;
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
          updateActivityStore();
          alert("Booking Cancelled");
          window.location.reload();
        } else alert("Failed to cancel registration for activity. Try again");
      })
      .catch((error) => console.log("API Connection Failed", error));

    updateActivityStore();
    window.location.reload();
  };

  const handleActivityReviews = () => {
    const url = `${baseURL}/returnreview`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activityId: params.token,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => setActivityReview([...res.body]))
      .catch((error) => console.log("API Connection Failed", error));
  };

  const handleRegisteredUsers = () => {
    const url = `${baseURL}/return_participant_Details`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activityId: activityDetails.activityId,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          setParticipantList(res.body);
        } else alert("Failed to fetch users");
      })
      .catch((error) => console.log("API Connection Failed", error));
  };

  const handleBookmarks = () => {
    let url = `${baseURL}/getbookmark`;
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userFromStore.userName,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        if (res.status === "OK") {
          setVenueBookmarks(res.body.favVenue);
          setActivityBookmarks(res.body.favActivity);
        } else alert("Unable to fetch bookmarks");
        return true;
      });
  };

  const removeBookmarks = () => {
    let newFavActivity = [...activityBookmarks].filter(
      (val) => val != activityDetails.activityId
    );

    let url = `${baseURL}/bookmark`;
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userFromStore.userName,
        favVenue: venueBookmarks,
        favActivity: newFavActivity,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          window.location.reload();
        } else {
          alert("Bookmarking Failed");
        }
      });
  };

  const addBookmarks = () => {
    let newFavActivity = [...activityBookmarks];
    console.log(activityBookmarks, newFavActivity);
    newFavActivity.push(activityDetails.activityId);

    newFavActivity = newFavActivity.sort((a, b) => a - b);

    let url = `${baseURL}/bookmark`;
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userFromStore.userName,
        favVenue: venueBookmarks,
        favActivity: newFavActivity,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          window.location.reload();
        } else {
          alert("Bookmarking Failed");
        }
      });
  };

  const deleteActivity = () => {
    let url = `${baseURL}/delete_activity_organizer`;
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activityId: activityDetails.activityId,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "OK") {
          window.location.reload();
        } else {
          alert("Deleteion Failed");
        }
      });
  };
  useEffect(() => {
    if (activityReview === null) {
      handleActivityReviews();
    }
    if (activityDetails === null) {
      setActivityDetails(
        [...JSON.parse(JSON.stringify(activityFromStore.activityList))].filter(
          (val) => val.activityId == params.token
        )[0]
      );
    }

    if (activityDetails !== null && venueDetails === null) {
      setVenueDetails(
        [...JSON.parse(JSON.stringify(eventFromStore.eventList))].filter(
          (val) => val.venueId === activityDetails.activityVenueId
        )[0]
      );
      handleRegisteredUsers();

      if (activityBookmarks == null && activityBookmarks == null) {
        handleBookmarks();
      }
    }

    if (registeredActivities == null) {
      const url = `${baseURL}/Registered_acts`;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userFromStore.userName,
        }),
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.status === "OK") {
            setRegisteredActivities([...res.body]);
          } else alert("Failed to get registered activities");
        });
    }
  }, [
    activityDetails,
    venueDetails,
    registeredActivities,
    activityBookmarks,
    activityBookmarks,
  ]);

  return (
    <div>
      {activityDetails !== null &&
      venueDetails !== null &&
      registeredActivities !== null &&
      activityBookmarks != null ? (
        <div className="d-flex justify-content-between">
          <div>
            <div className="mx-auto text-center">
              <h1 style={{ width: "50vw" }}>
                Activity Name: {activityDetails.activityName}
              </h1>
              <div>
                {activityBookmarks.includes(activityDetails.activityId) ? (
                  <button className="btn btn-danger" onClick={removeBookmarks}>
                    Remove from bookmarks
                  </button>
                ) : (
                  <>
                    <button className="btn btn-primary" onClick={addBookmarks}>
                      Add to bookmark
                    </button>
                  </>
                )}
                <br />
                {activityDetails.activityOrganizer ==
                  userFromStore.userName && (
                  <button className="btn btn-danger" onClick={deleteActivity}>
                    Delete Activity
                  </button>
                )}
              </div>
            </div>
            <div className="mx-auto mt-5">
              <div className="card mb-2 p-3 " style={{ minHeight: "800px" }}>
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
                      <b>Venue Address:</b> {venueDetails.venueAddress}
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

                    <img
                      className="card-img-top"
                      alt="Card Image"
                      src={activityDetails.activityImage}
                    />
                  </div>
                </div>

                <div>
                  <div colSpan={2}>
                    <div className="text-center">
                      {!registeredActivities.includes(
                        activityDetails.activityId
                      ) ? (
                        <>
                          {/* <div>
                          <div style={{ width: "500px" }} className="mx-auto">
                            <div>
                              Enter Card Number:{" "}
                              <input
                                type={"text"}
                                className="form-control"
                                maxLength={16}
                                style={{
                                  width: "50%",
                                  display: "inline-block",
                                }}
                                onChange={(e) => {
                                  setPaymentCreds({
                                    ...paymentCreds,
                                    cardNumber: e.target.value,
                                  });
                                }}
                              ></input>
                            </div>
                            <br />
                            <div>
                              Enter Card Expiry:{" "}
                              <input
                                type={"month"}
                                className="form-control"
                                style={{
                                  width: "50%",
                                  display: "inline-block",
                                }}
                                onChange={(e) => {
                                  setPaymentCreds({
                                    ...paymentCreds,
                                    expiry: e.target.value,
                                  });
                                }}
                              ></input>
                            </div>
                            <br />
                            <div>
                              Enter Card CVV:{" "}
                              <input
                                type={"password"}
                                className="form-control"
                                maxLength={3}
                                style={{
                                  width: "50%",
                                  display: "inline-block",
                                }}
                                onChange={(e) => {
                                  setPaymentCreds({
                                    ...paymentCreds,
                                    cvv: e.target.value,
                                  });
                                }}
                              ></input>
                            </div>
                          </div>
                          <br />
                          <button
                            className={
                              "btn " +
                              (activityDetails.activityRemainingCapacity > 0
                                ? "btn-primary"
                                : "btn-danger")
                            }
                            onClick={() => {
                              if (
                                paymentCreds.cardNumber !== null &&
                                paymentCreds.cvv !== null &&
                                paymentCreds.expiry != null
                              )
                                handleActivityRegistration();
                              else {
                                alert("Please fill all payment details");
                              }
                            }}
                          >
                            {activityDetails.activityRemainingCapacity > 0
                              ? "Confirm Booking"
                              : "Activity has reached maximum capacity"}
                          </button>
                        </div> */}

                          <div className="mx-auto d-block text-center">
                            {activityDetails.activityRemainingCapacity > 0 &&
                            clientSecret ? (
                              <>
                                <Elements
                                  options={options}
                                  stripe={stripePromise}
                                >
                                  <CheckoutForm
                                    email={userFromStore.email}
                                    returnUrl={window.location.href}
                                  />
                                </Elements>

                                {urlParams.get("redirect_status") ===
                                  "succeeded" && (
                                  <button
                                    className={
                                      "btn " +
                                      (activityDetails.activityRemainingCapacity >
                                      0
                                        ? "btn-primary"
                                        : "btn-danger")
                                    }
                                    onClick={() => {
                                      handleActivityRegistration();
                                    }}
                                  >
                                    {activityDetails.activityRemainingCapacity >
                                    0
                                      ? "Next"
                                      : "Activity has reached maximum capacity"}
                                  </button>
                                )}
                              </>
                            ) : (
                              <button
                                className={
                                  "btn " +
                                  (activityDetails.activityRemainingCapacity > 0
                                    ? "btn-primary"
                                    : "btn-danger")
                                }
                              >
                                Activity has reached maximum capacity
                              </button>
                            )}
                          </div>
                        </>
                      ) : (
                        <div>
                          <button
                            className="btn btn-danger"
                            onClick={handleActivityCancellation}
                          >
                            Cancel Registration
                          </button>
                          <div
                            className="mt-5 mx-auto"
                            style={{ width: "500px" }}
                          >
                            <h3>Review Activity</h3>
                            <br></br>
                            <div className="form-group">
                              <label>Select Stars </label>

                              <ReactStars
                                count={5}
                                onChange={setStars}
                                size={24}
                                activeColor="#ffd700"
                                classNames={"mx-auto"}
                              />

                              <br />
                            </div>
                            <div className="form-group">
                              <label>Enter Review: </label>
                              <textarea
                                type="text"
                                className="form-control"
                                onChange={(e) => setReview(e.target.value)}
                              />
                              <br />
                            </div>
                            <button
                              className="btn btn-primary"
                              onClick={handleReviewSubmit}
                            >
                              Submit Review
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mx-auto mt-5" style={{ minHeight: "400px" }}>
              <div className="card mb-2 p-3">
                <div className="mx-auto text-center">
                  <h1 style={{ width: "50vw" }}>Reviews</h1>
                </div>
                {activityReview !== null && (
                  <div className="card-body">
                    {activityReview.map((val, index) => (
                      <div key={index} className="card p-3 mb-1">
                        <ul style={{ listStyleType: "none" }}>
                          <li>Participant Username: {val.userName}</li>
                          <li>Rating: {val.rating}</li>
                          <li>Review: {val.review}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {userFromStore.userName == activityDetails.activityOrganizer ? (
                <div className="mx-auto mt-5" style={{ minHeight: "400px" }}>
                  <div className="card mb-2 p-3">
                    <div className="mx-auto text-center">
                      <h1 style={{ width: "50vw" }}>Participant List</h1>
                    </div>

                    <div className="card-body">
                      {participantList !== null &&
                        participantList.emailList.map((val, index) => (
                          <div className="card p-3 mb-1" id={index} key={index}>
                            <div>
                              Username: {participantList.userNameList[index]}
                            </div>
                            <div>Email: {participantList.emailList[index]}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
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
