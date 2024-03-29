import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearEvent, setEvent } from "../redux/event";
import baseURL from "../constants/constants";
import venueListMock from "../Mocks/venueListMock";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import ImageUploading from "react-images-uploading";

import Dropdown from "react-bootstrap/Dropdown";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { DropdownButton } from "react-bootstrap";
import time24 from "../constants/time24";
import bookmarksMock from "../Mocks/bookmarksMock";
import ReactStars from "react-rating-stars-component";
import themeStyles from "../themeStyles";
import Chat from "../Chat/Chat";

const timeSlots = [
  "12 a.m. - 1 a.m.",
  "1 a.m. - 2 a.m.",
  "2 a.m. - 3 a.m.",
  "3 a.m. - 4 a.m.",
  "4 a.m. - 5 a.m.",
  "5 a.m. - 6 a.m.",
  "6 a.m. - 7 a.m.",
  "7 a.m. - 8 a.m.",
  "8 a.m. - 9 a.m.",
  "9 a.m. - 10 a.m.",
  "10 a.m. - 11 a.m.",
  "11 a.m. - 12 p.m.",
  "12 p.m. - 1 p.m.",
  "1 p.m. - 2 p.m.",
  "2 p.m. - 3 p.m.",
  "3 p.m. - 4 p.m.",
  "4 p.m. - 5 p.m.",
  "5 p.m. - 6 p.m.",
  "6 p.m. - 7 p.m.",
  "7 p.m. - 8 p.m.",
  "8 p.m. - 9 p.m.",
  "9 p.m. - 10 p.m.",
  "10 p.m. - 11 p.m.",
  "11 p.m. - 12 a.m.",
];

const newVenueSlots = [
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
  ["open", -1],
];
var days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const VenueDetails = () => {
  const [images, setImages] = React.useState([]);
  const eventFromStore = useSelector((state) => state.event);
  const userFromStore = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const [activityName, setActivityName] = useState(null);
  const [activityCapacity, setActivityCapacity] = useState(0);
  const [activityDescription, setActivityDescription] = useState(null);
  const [activityLocation, setActivityLocation] = useState(null);
  const [activityCategory, setActivityCategory] = useState(null);
  const [activityAgeRange, setActivityAgeRange] = useState(null);
  const [activityCost, setActivityCost] = useState(null);
  const [activityCostAmount, setActivityCostAmount] = useState(0);
  const [venueDetails, setVenueDetails] = useState(null);
  const [formattedReservationDate, setFormattedReservationDate] = useState(
    `${new Date().getUTCFullYear()}-${
      new Date().getUTCMonth() + 1
    }-${new Date().getUTCDate()}`
  );
  const [reservationDate, setReservationDate] = useState(new Date());

  const [availableTimeSlot, setAvailableTimeSlot] = useState(null);

  const [selectedSlotList, setSelectedSlotList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [activityImage, setActivityImage] = useState(null);

  const [venueBookmarks, setVenueBookmarks] = useState(null);
  const [activityBookmarks, setActivityBookmarks] = useState(null);

  const [venueReview, setVenueReview] = useState(null);

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);

  const [allowedUsers, setAllowedUsers] = useState([]);

  const themeFromStore = useSelector((state) => state.theme);

  const [allowChatTrigger, setAllowChatTrigger] = useState(false);

  const handleReviewSubmit = () => {
    const url = `${baseURL}/venuereview`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        venueId: venueDetails.venueId,
        userName: userFromStore.userName,
        review: review,
        rating: stars,
      }),
    };

    fetch(url, requestOptions).then((response) => response.json());

    handleVenueReviews();
    window.location.reload();
  };

  const checkAllowedUsers = () => {
    const url = `${baseURL}/getuser`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        venueId: venueDetails.venueId,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => setAllowedUsers(res.body[0]));
  };

  const bookingDetailsHandler = () => {
    if (
      activityName !== null &&
      activityName !== "" &&
      activityName !== undefined &&
      activityCapacity !== null &&
      activityCapacity !== "" &&
      activityCapacity !== undefined &&
      activityDescription !== null &&
      activityDescription !== "" &&
      activityDescription !== undefined &&
      activityLocation !== null &&
      activityLocation !== "" &&
      activityLocation !== undefined &&
      activityCategory !== undefined &&
      activityCategory !== null &&
      activityCategory !== "" &&
      activityAgeRange !== undefined &&
      activityAgeRange !== null &&
      activityAgeRange !== "" &&
      activityCost !== undefined &&
      activityCost !== null &&
      activityCost !== ""
    ) {
      return true;
    } else return false;
  };

  const slotAddRemoveBtn = (index) => {
    if (
      availableTimeSlot[index][0] === "open" &&
      index <= 11 &&
      index > venueDetails.venueAvailability[days[reservationDate.getDay()]][0]
    ) {
      if (selectedSlotList.includes(index)) {
        return (
          <button
            className="btn btn-danger"
            onClick={() => {
              var removeIndex = selectedSlotList.indexOf(index);
              if (removeIndex > -1) {
                setSelectedSlotList(
                  selectedSlotList.filter((val) => val != index)
                );
              }
            }}
          >
            Remove Slot
          </button>
        );
      } else {
        return (
          <button
            className="btn btn-success"
            onClick={() => setSelectedSlotList([...selectedSlotList, index])}
          >
            Add Slot
          </button>
        );
      }
    } else if (
      index > 11 &&
      index < venueDetails.venueAvailability[days[reservationDate.getDay()]][1]
    ) {
      if (selectedSlotList.includes(index)) {
        return (
          <button
            className="btn btn-danger"
            onClick={() => {
              var removeIndex = selectedSlotList.indexOf(index);
              if (removeIndex > -1) {
                setSelectedSlotList(
                  selectedSlotList.filter((val) => val != index)
                );
              }
            }}
          >
            Remove Slot
          </button>
        );
      } else {
        return (
          <button
            className="btn btn-success"
            onClick={() => setSelectedSlotList([...selectedSlotList, index])}
          >
            Add Slot
          </button>
        );
      }
    } else {
      return <b>Unavailable/Closed</b>;
    }
  };

  const handleDate = async (value) => {
    setIsLoading(true);

    await setReservationDate(value);

    await setFormattedReservationDate(
      `${value.getUTCFullYear()}-${
        value.getUTCMonth() + 1
      }-${value.getUTCDate()}`
    );
    if (venueDetails.venueSlots.hasOwnProperty(formattedReservationDate)) {
      await setAvailableTimeSlot([
        ...venueDetails.venueSlots[
          `${value.getUTCFullYear()}-${
            value.getUTCMonth() + 1
          }-${value.getUTCDate()}`
        ],
      ]);
    } else {
      await setAvailableTimeSlot([...newVenueSlots]);
    }
    setIsLoading(false);
  };

  const imageConverter = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleVenueLayoutImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await imageConverter(file);
    setActivityImage(base64);
  };

  const removeBookmarks = () => {
    let newFavVenue = [...venueBookmarks].filter(
      (val) => val != venueDetails.venueId
    );

    let url = `${baseURL}/bookmark`;
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userFromStore.userName,
        favVenue: newFavVenue,
        favActivity: activityBookmarks,
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
    let newFavVenue = [...venueBookmarks];
    newFavVenue.push(venueDetails.venueId);

    newFavVenue = newFavVenue.sort((a, b) => a - b);

    let url = `${baseURL}/bookmark`;
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userFromStore.userName,
        favVenue: newFavVenue,
        favActivity: activityBookmarks,
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

  const handleGetBookmarks = () => {
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

  const handleVenueReviews = () => {
    const url = `${baseURL}/venuereviews`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        venueId: venueDetails.venueId,
      }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status == "OK") {
          setVenueReview([...res.body]);
        } else {
          setVenueReview([]);
        }
      })
      .catch((error) => console.log("API Connection Failed", error));
  };

  const allowChat = () => {
    const url = `${baseURL}/organisercheck`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        venueId: venueDetails.venueId,
        userName: userFromStore.userName,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        setAllowChatTrigger(res.body == "true" ? true : false);
      })
      .catch((error) => console.log("API Connection Failed", error));
  };

  useEffect(() => {
    if (userFromStore.userName != null && venueDetails != null) {
      allowChat();
    }

    if (venueDetails == null) {
      setVenueDetails({
        ...JSON.parse(
          JSON.stringify(
            eventFromStore.eventList.filter(
              (val) => val.venueId == params.token
            )[0]
          )
        ),
      });
    }

    if (venueDetails != null && venueReview == null) {
      handleVenueReviews();
      checkAllowedUsers();
    }

    if (venueBookmarks == null && activityBookmarks == null) {
      handleGetBookmarks();
    }
  }, [venueDetails, selectedSlotList, allowChatTrigger]);

  return (
    <div className={themeStyles[themeFromStore.value].body}>
      {venueDetails !== null &&
      venueBookmarks !== null &&
      activityBookmarks != null ? (
        <div>
          <h1 className="mx-auto" style={{ width: "fit-content" }}>
            Venue Name: {venueDetails.venueName}
          </h1>
          <div className="mx-auto mt-5" style={{ width: "95%" }}>
            <div
              className={
                "card mb-2 p-3 " +
                themeStyles[themeFromStore.value].bodyHeavy +
                " " +
                themeStyles[themeFromStore.value].text
              }
            >
              <div className="card-body d-flex justify-content-between">
                <div>
                  <p className="card-text">
                    <b>Description:</b> {venueDetails.venueDescription}
                  </p>
                  <p className="card-text">
                    <b>Address:</b> {venueDetails.venueAddress}
                  </p>
                  <p className="card-text">
                    <b>Owner:</b> {venueDetails.venueOwner}
                  </p>
                  <p className="card-text">
                    <b>Cost/hr:</b> ${venueDetails.venueHrCost}
                  </p>
                  <p className="card-text">
                    <b>Category:</b> {venueDetails.venueCategory}
                  </p>
                  <p className="card-text">
                    <b>City:</b> {venueDetails.venueCity}
                  </p>
                  <p className="card-text">
                    <b>State:</b> {venueDetails.venueState}
                  </p>

                  {/* <img className="card-img-top" alt="Card Image" /> */}
                </div>
                <div
                  className={
                    "align-self-center " +
                    themeStyles[themeFromStore.value].text
                  }
                >
                  <div>
                    <table className="table">
                      <tbody className={themeStyles[themeFromStore.value].text}>
                        <tr>
                          <th>Day</th>
                          <th>Time</th>
                        </tr>
                        <tr>
                          <td>Monday</td>
                          <td>{`${
                            time24[venueDetails.venueAvailability.mon[0]]
                          } - ${
                            time24[venueDetails.venueAvailability.mon[1]]
                          }`}</td>
                        </tr>
                        <tr>
                          <td>Tuesday</td>
                          <td>{` ${
                            time24[venueDetails.venueAvailability.tue[0]]
                          } - ${
                            time24[venueDetails.venueAvailability.tue[1]]
                          }`}</td>
                        </tr>
                        <tr>
                          <td>Wednesday</td>
                          <td>{`${
                            time24[venueDetails.venueAvailability.wed[0]]
                          } - ${
                            time24[venueDetails.venueAvailability.wed[1]]
                          }`}</td>
                        </tr>
                        <tr>
                          <td>Thursday</td>
                          <td>{`${
                            time24[venueDetails.venueAvailability.thu[0]]
                          } - ${
                            time24[venueDetails.venueAvailability.thu[1]]
                          }`}</td>
                        </tr>
                        <tr>
                          <td>Friday</td>
                          <td>{`${
                            time24[venueDetails.venueAvailability.fri[0]]
                          } - ${
                            time24[venueDetails.venueAvailability.fri[1]]
                          }`}</td>
                        </tr>
                        <tr>
                          <td>Saturday</td>
                          <td>{`${
                            time24[venueDetails.venueAvailability.sat[0]]
                          } - ${
                            time24[venueDetails.venueAvailability.sat[1]]
                          }`}</td>
                        </tr>
                        <tr>
                          <td>Sunday</td>
                          <td>{`${
                            time24[venueDetails.venueAvailability.sun[0]]
                          } - ${
                            time24[venueDetails.venueAvailability.sun[1]]
                          }`}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <img
                    className="card-img-top"
                    alt="Card Image"
                    src={venueDetails.venueImage}
                    style={{ width: "400px" }}
                  />
                </div>
                <div>
                  {venueBookmarks.includes(venueDetails.venueId) ? (
                    <button
                      className="btn btn-danger"
                      onClick={removeBookmarks}
                    >
                      Remove from bookmarks
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={addBookmarks}>
                      Add to bookmark
                    </button>
                  )}
                </div>
              </div>
              {userFromStore.userName !== venueDetails.venueOwner &&
                userFromStore.userName != null && (
                  <>
                    <h1 className="mx-auto">Reserve Venue</h1>
                    <div className="mx-auto">
                      <Calendar onChange={handleDate} value={reservationDate} />
                    </div>

                    <br />
                    <div className="mx-auto">
                      <h1>Select Time Slots</h1>
                    </div>
                    {availableTimeSlot !== null ? (
                      <div className="d-flex justify-content-between">
                        {isLoading != true ? (
                          <React.Fragment>
                            <div>
                              <table
                                className="table"
                                style={{ width: "500px" }}
                              >
                                <tbody
                                  className={
                                    themeStyles[themeFromStore.value].text
                                  }
                                >
                                  <tr>
                                    <th>Time</th>
                                    <th>Availability</th>
                                  </tr>
                                  {timeSlots.map((val, index) => {
                                    if (index < 12)
                                      return (
                                        <tr key={index}>
                                          <td>{timeSlots[index]}</td>
                                          <td>{slotAddRemoveBtn(index)}</td>
                                        </tr>
                                      );
                                  })}
                                </tbody>
                              </table>
                            </div>
                            <div>
                              <table
                                className="table"
                                style={{ width: "500px" }}
                              >
                                <tbody
                                  className={
                                    themeStyles[themeFromStore.value].text
                                  }
                                >
                                  <tr>
                                    <th>Time</th>
                                    <th>Availability</th>
                                  </tr>
                                  {timeSlots.map((val, index) => {
                                    if (index >= 12)
                                      return (
                                        <tr key={index}>
                                          <td>{timeSlots[index]}</td>
                                          <td>{slotAddRemoveBtn(index)}</td>
                                        </tr>
                                      );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </React.Fragment>
                        ) : (
                          <div className="mx-auto">
                            <h6>Loading</h6>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mx-auto">
                        <h6>Choose date to reserve venue</h6>
                      </div>
                    )}

                    <br />

                    <div className="mx-auto">
                      <h1> Confirm Booking</h1>
                    </div>
                    {selectedSlotList.length > 0 ? (
                      <div className="d-flex justify-content-between">
                        <div className="mx-auto" style={{ width: "500px" }}>
                          <table className="table" style={{ width: "500px" }}>
                            <tbody
                              className={themeStyles[themeFromStore.value].text}
                            >
                              <tr>
                                <th>Enter Activity Name:</th>
                                <td>
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      setActivityName(e.target.value)
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th>Enter Activity Capacity:</th>
                                <td>
                                  <input
                                    type="number"
                                    onChange={(e) =>
                                      setActivityCapacity(e.target.value)
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th>Enter Activity Details:</th>
                                <td>
                                  <textarea
                                    onChange={(e) =>
                                      setActivityDescription(e.target.value)
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th>Enter Activity Location:</th>
                                <td>
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      setActivityLocation(e.target.value)
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th>Enter Activity Category:</th>
                                <td>
                                  <Dropdown>
                                    <DropdownButton
                                      variant="success"
                                      id="dropdown-basic"
                                      onSelect={(e) => {
                                        setActivityCategory(e);
                                      }}
                                      title={
                                        activityCategory == null
                                          ? "Select Category"
                                          : activityCategory
                                      }
                                    >
                                      <Dropdown.Item eventKey={"Music"}>
                                        Music
                                      </Dropdown.Item>
                                      <Dropdown.Item eventKey={"Sports"}>
                                        Sports
                                      </Dropdown.Item>
                                      <Dropdown.Item eventKey={"Comedy"}>
                                        Comedy
                                      </Dropdown.Item>
                                    </DropdownButton>
                                  </Dropdown>
                                </td>
                              </tr>
                              <tr>
                                <th>Enter Activity Age:</th>
                                <td>
                                  <Dropdown>
                                    <DropdownButton
                                      variant="success"
                                      id="dropdown-basic"
                                      onSelect={(e) => {
                                        setActivityAgeRange(e);
                                      }}
                                      title={
                                        activityAgeRange == null
                                          ? "Select Age Range"
                                          : activityAgeRange
                                      }
                                    >
                                      <Dropdown.Item eventKey={"Any"}>
                                        Everyone
                                      </Dropdown.Item>
                                      <Dropdown.Item eventKey={"A65"}>
                                        Above 65
                                      </Dropdown.Item>
                                      <Dropdown.Item eventKey={"A18"}>
                                        Above 18
                                      </Dropdown.Item>
                                      <Dropdown.Item eventKey={"B18"}>
                                        Below 18
                                      </Dropdown.Item>
                                    </DropdownButton>
                                  </Dropdown>
                                </td>
                              </tr>
                              <tr>
                                <th>Activity Cost</th>
                                <td>
                                  {" "}
                                  <Dropdown>
                                    <DropdownButton
                                      variant="success"
                                      id="dropdown-basic"
                                      onSelect={(e) => {
                                        setActivityCost(e);
                                      }}
                                      title={
                                        activityCost == null
                                          ? "Select Cost"
                                          : activityCost
                                      }
                                    >
                                      <Dropdown.Item eventKey={"Free"}>
                                        Free
                                      </Dropdown.Item>
                                      <Dropdown.Item eventKey={"Paid"}>
                                        Paid
                                      </Dropdown.Item>
                                    </DropdownButton>
                                  </Dropdown>
                                </td>
                              </tr>
                              <tr>
                                <th>Activity Cost Amount</th>
                                <td>
                                  {" "}
                                  <input
                                    type="number"
                                    onChange={(e) =>
                                      setActivityCostAmount(e.target.value)
                                    }
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th>Date</th>
                                <td>{`${reservationDate.getUTCFullYear()}-${
                                  reservationDate.getUTCMonth() + 1
                                }-${reservationDate.getUTCDate()}`}</td>
                              </tr>
                              <tr>
                                <th>Slots Booked</th>
                                <td>
                                  <ul>
                                    {selectedSlotList.map((val) => {
                                      return (
                                        <li key={val}>{timeSlots[val]}</li>
                                      );
                                    })}{" "}
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <th>Total Reservation Cost:</th>
                                <td>
                                  {venueDetails.venueHrCost *
                                    selectedSlotList.length}
                                </td>
                              </tr>
                              <tr>
                                <th>Select Venue Layout Image</th>
                                <td>
                                  <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    className="form-control"
                                    onChange={(e) => {
                                      handleVenueLayoutImage(e);
                                    }}
                                  ></input>
                                </td>
                              </tr>

                              <tr>
                                <td colSpan={2}>
                                  <div className="text-center">
                                    <button
                                      className={
                                        "btn " +
                                        (bookingDetailsHandler()
                                          ? "btn-primary"
                                          : "btn-danger")
                                      }
                                    >
                                      {bookingDetailsHandler() ? (
                                        <Link
                                          to={{
                                            pathname: "venue-booking",
                                          }}
                                          state={{
                                            venueDetails: JSON.parse(
                                              JSON.stringify(venueDetails)
                                            ),
                                            reservationDate,
                                            availableTimeSlot,
                                            timeSlots,
                                            selectedSlotList,
                                            formattedReservationDate: `${reservationDate.getUTCFullYear()}-${
                                              reservationDate.getUTCMonth() + 1
                                            }-${reservationDate.getUTCDate()}`,
                                            activityName,
                                            activityLocation,
                                            activityCapacity,
                                            activityCategory,
                                            activityAgeRange,
                                            activityCost,
                                            activityDescription,
                                            activityCostAmount,
                                            activityImage,
                                          }}
                                          style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                          }}
                                        >
                                          Confirm Booking
                                        </Link>
                                      ) : (
                                        "Enter Activity Details to proceed"
                                      )}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div>
                          {setActivityImage && (
                            <img
                              src={activityImage}
                              style={{ width: "500px" }}
                            />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="mx-auto">Please select a slot first</div>
                    )}
                  </>
                )}
            </div>
          </div>

          <div>
            <div
              className="mx-auto mt-5"
              style={{ minHeight: "400px", width: "50vw" }}
            >
              <div className="card mb-2 p-3">
                {userFromStore.userName !== venueDetails.venueOwner &&
                userFromStore.userName != null &&
                allowedUsers != null &&
                allowedUsers != undefined &&
                allowedUsers.length >= 1 ? (
                  allowedUsers.includes(userFromStore.userName) && (
                    <div className="mt-5 mx-auto" style={{ width: "500px" }}>
                      <h3>Review Venue</h3>
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
                  )
                ) : (
                  <h4 style={{ textAlign: "center" }}>
                    Only Paid Organizers can submit review
                  </h4>
                )}
                <br />
                <div className="mx-auto text-center">
                  <h1 style={{ width: "50vw" }}>Reviews</h1>
                </div>
                {venueReview !== null && (
                  <div className="card-body">
                    {venueReview.map((val, index) => (
                      <div
                        key={index}
                        className={
                          "card p-3 mb-1 " +
                          themeStyles[themeFromStore.value].bodyHeavy +
                          " " +
                          themeStyles[themeFromStore.value].text
                        }
                      >
                        <ul style={{ listStyleType: "none" }}>
                          <li>Username: {val.userName}</li>
                          <li>Rating: {val.rating}</li>
                          <li>Review: {val.review}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {allowChatTrigger ? (
              <Chat id={"venue" + params.token} />
            ) : (
              <div
                className="card text-center mx-auto"
                style={{ width: "50vw" }}
              >
                {" "}
                <h1>Login To Access Chat</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto text-center mt-5">
          <h1> Loading</h1>
        </div>
      )}
    </div>
  );
};

export default VenueDetails;
