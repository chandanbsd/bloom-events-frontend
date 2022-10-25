import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearEvent, setEvent } from "../redux/event";
import baseURL from "../constants/constants";
import venueDetailsMock from "../Mocks/venueDetailsMock";
import venueListMock from "../Mocks/venueDetailsMock";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Dropdown from "react-bootstrap/Dropdown";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import { DropdownButton } from "react-bootstrap";

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

const VenueDetails = () => {
  const eventFromStore = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const params = useParams();

  // console.log(params.token);
  const [eventDetails, setEventDetails] = useState({ ...venueDetailsMock });
  const [reservationDate, setReservationDate] = useState(new Date());
  const [availableTimeSlot, setAvailableTimeSlot] = useState([
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
    "open",
  ]);

  const [selectedSlotList, setSelectedSlotList] = useState([]);

  const slotAddRemoveBtn = (index) => {
    if (availableTimeSlot[index] === "open") {
      if (selectedSlotList.includes(index)) {
        return (
          <button
            className="btn btn-danger"
            onClick={() => {
              var removeIndex = selectedSlotList.indexOf(index);
              if (removeIndex > -1) {
                console.log(selectedSlotList, index);
                setSelectedSlotList(
                  // [...selectedSlotList].splice(removeIndex, 1)
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
    }
  };

  //   useEffect(() => {
  //     const url = `${baseURL}/venuelist`;
  //     const requestOptions = {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     };
  //     fetch(url, requestOptions)
  //       .then((response) => response.json())

  //       .then((res) => {
  //         if (res.status === "OK") {
  //           res.body.forEach((val) => {
  //             eventDetails.venueAvailability = JSON.parse(
  //               eventDetails.venueAvailability.replace(/'/g, '"')
  //             );
  //           });

  //           dispatch(setEvent([...res.body]));
  //           setEventList(JSON.parse(JSON.stringify(eventFromStore.eventList)));
  //           setFilteredEventList(
  //             JSON.parse(JSON.stringify(eventFromStore.eventList))
  //           );
  //         } else alert("Unable to fetch event venues");
  //       })
  //       .catch((error) => console.log("Form submit error", error));
  //   }, []);

  window.onload = async () => {
    // console.log(venueDetailsMock);
    // setEventDetails({ ...venueDetailsMock });
    // await dispatch(setEvent([...venueListMock]));
    // await setEventaDetails(JSON.parse(JSON.stringify(eventFromStore.eventList)));
  };

  useEffect(() => {
    console.log(selectedSlotList);
  }, [reservationDate, selectedSlotList]);

  return (
    <div>
      <h1 className="mx-auto" style={{ width: "fit-content" }}>
        Venue Name: {eventDetails.venueName}
      </h1>
      <div className="mx-auto mt-5" style={{ width: "90%" }}>
        <div className="card mb-2 p-3">
          <div className="card-body d-flex justify-content-between">
            <div>
              <h5 className="card-title">Name: {eventDetails.venueName}</h5>
              <p className="card-text">
                Description: {eventDetails.venueDescription}
              </p>
              <p className="card-text">Address: {eventDetails.venueAddress}</p>
              <p className="card-text">Owner: {eventDetails.venueOwner}</p>
              <p className="card-text">Cost/hr: ${eventDetails.venueHrCost}</p>
              <p className="card-text">
                Category: {eventDetails.venueCategory}
              </p>
              <p className="card-text">City: {eventDetails.venueCity}</p>
              <p className="card-text">State: {eventDetails.venueState}</p>

              {/* <img className="card-img-top" alt="Card Image" /> */}
            </div>
            <div className="align-self-center">
              <div>
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Day</th>
                      <th>Time</th>
                    </tr>
                    <tr>
                      <td>Monday</td>
                      <td>{`${eventDetails.venueAvailability.mon[0]} - ${eventDetails.venueAvailability.mon[1]}`}</td>
                    </tr>
                    <tr>
                      <td>Tuesday</td>
                      <td>{`${eventDetails.venueAvailability.tue[0]} - ${eventDetails.venueAvailability.tue[1]}`}</td>
                    </tr>
                    <tr>
                      <td>Wednesday</td>
                      <td>{`${eventDetails.venueAvailability.wed[0]} - ${eventDetails.venueAvailability.wed[1]}`}</td>
                    </tr>
                    <tr>
                      <td>Thursday</td>
                      <td>{`${eventDetails.venueAvailability.thu[0]} - ${eventDetails.venueAvailability.thu[1]}`}</td>
                    </tr>
                    <tr>
                      <td>Friday</td>
                      <td>{`${eventDetails.venueAvailability.fri[0]} - ${eventDetails.venueAvailability.fri[1]}`}</td>
                    </tr>
                    <tr>
                      <td>Saturday</td>
                      <td>{`${eventDetails.venueAvailability.sat[0]} - ${eventDetails.venueAvailability.sat[1]}`}</td>
                    </tr>
                    <tr>
                      <td>Sunday</td>
                      <td>{`${eventDetails.venueAvailability.sun[0]} - ${eventDetails.venueAvailability.sun[1]}`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <h1 className="mx-auto">Reserve Venue</h1>
          <div className="mx-auto">
            <Calendar onChange={setReservationDate} value={reservationDate} />
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <table className="table" style={{ width: "500px" }}>
                <tbody>
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
              <table className="table" style={{ width: "500px" }}>
                <tbody>
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
          </div>

          {/* <div>Available Slots for {reservationDate.toLocaleDateString()}</div>
          <span>
            <Dropdown onChange={(e) => setSelectedTimeSlot(e)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {timeSlots.map((val, index) => {
                  if (avaiableTimeSlot[index] === "open") {
                    return (
                      <Dropdown.Item key={index} eventKey={val}>
                        {val}
                      </Dropdown.Item>
                    );
                  }
                })}
              </Dropdown.Menu>
            </Dropdown>
          </span> */}

          <div className="mx-auto">
            <h1> Confirm Booking</h1>
          </div>
          <div className="mx-auto" style={{ width: "500px" }}>
            <table className="table" style={{ width: "500px" }}>
              <tbody>
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
                        return <li key={val}>{timeSlots[val]}</li>;
                      })}{" "}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>Total Cost:</th>
                  <td>{eventDetails.venueHrCost * selectedSlotList.length}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="mx-auto">
                      <button className="btn btn-primary">
                        Confirm Booking
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
