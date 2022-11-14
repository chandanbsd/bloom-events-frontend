import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { usaCityStates, usStates, usCities } from "../constants/usaCityStates";
import time24 from "../constants/time24";
import initalTimeSlot from "../constants/initalTimeSlot";

const VenueCreation = () => {
  const userFromStore = useSelector((state) => state.user);

  const [venueDetails, setVenueDetails] = useState({
    venueHrCost: null,
    venueId: null,
    venueAddress: null,
    venueName: null,
    venueOpen: null,
    venueOwner: null,
    venueDescription: null,
    venueCategory: null,
    venueCity: null,
    venueState: "Alabama",
    venueSlots: initalTimeSlot,
  });

  const [mon, setMon] = useState([]);
  const [tue, setTue] = useState([]);
  const [wed, setWed] = useState([]);
  const [thu, setThu] = useState([]);
  const [fri, setFri] = useState([]);
  const [sat, setSat] = useState([]);
  const [sun, setSun] = useState([]);

  const handleSubmit = () => {
    if (
      venueDetails.venueHrCost &&
      venueDetails.venueId &&
      venueDetails.venueAddress &&
      venueDetails.venueName &&
      venueDetails.venueOpen &&
      venueDetails.venueOwner &&
      venueDetails.venueDescription &&
      venueDetails.venueCategory &&
      venueDetails.venueCity &&
      venueDetails.venueState &&
      venueDetails.venueSlots
    ) {
      if (
        mon.length == 2 &&
        tue.length == 2 &&
        wed.length == 2 &&
        thu.length == 2 &&
        fri.length == 2 &&
        sat.length == 2 &&
        sun.length == 2
      ) {
        if (
          mon[1] > mon[0] &&
          tue[1] > tue[0] &&
          wed[1] > wed[0] &&
          thu[1] > thu[0] &&
          fri[1] > fri[0] &&
          sat[1] > sat[0] &&
          sun[1] > sun[0]
        ) {
          console.log(mon, tue, wed, thu, fri, sat, sun);
        } else {
          alert("Closing time cannot be before opening time");
        }
      }
    } else alert("Enter all details");
  };
  return (
    <>
      {userFromStore.isOwner ? (
        <div className="mx-auto" style={{ width: "90vw" }}>
          <div className="mx-auto text-center mb-2">
            <h1>Add Your Venue</h1>
          </div>
          <div className="d-flex justify-content-around">
            <div style={{ width: "500px" }}>
              <div className="form-group">
                <div className="form-group">
                  <label>Venue Owner: </label>
                  {userFromStore.userName}
                  <br />
                </div>
                <label>Venue Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setVenueDetails({
                      ...venueDetails,
                      venueName: e.target.value,
                    })
                  }
                />{" "}
                <br />
              </div>
              <div className="form-group">
                <label>Venue Description</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setVenueDetails({
                      ...venueDetails,
                      venueDescription: e.target.value,
                    })
                  }
                />{" "}
                <br />
              </div>
              <div className="form-group">
                <label>Venue Address</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setVenueDetails({
                      ...venueDetails,
                      venueAddress: e.target.value,
                    })
                  }
                />{" "}
                <br />
              </div>
              <div className="form-group">
                <label>Venue Hourly Cost</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) =>
                    setVenueDetails({
                      ...venueDetails,
                      venueHrCost: e.target.value,
                    })
                  }
                />{" "}
                <br />
              </div>
              <div className="form-group">
                <label>Venue Open</label>
                <select
                  className="form-control"
                  onChange={(e) =>
                    setVenueDetails({
                      ...venueDetails,
                      venueOpen: e.target.value,
                    })
                  }
                >
                  <option value={null} defaultValue>
                    Choose an option:
                  </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
                <br />
              </div>

              <div className="form-group">
                <label>Venue Primary Category: </label>
                <select
                  className="form-control"
                  onChange={(e) =>
                    setVenueDetails({
                      ...venueDetails,
                      venueCategory: e.target.value,
                    })
                  }
                >
                  <option value={null} defaultValue>
                    Choose an option
                  </option>
                  <option value={"Music"}>Music</option>
                  <option value={"Sports"}>Sports</option>
                  <option value={"Comedy"}>Comedy</option>
                </select>
                <br />
              </div>

              <div className="form-group">
                <label>Select State: </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    setVenueDetails({
                      ...venueDetails,
                      state: e.target.value,
                    });

                    setVenueDetails({
                      ...venueDetails,
                      city: usaCityStates[e.target.value][0],
                    });
                  }}
                >
                  {usStates.map((ele, index) => (
                    <option value={ele} key={index}>
                      {ele}
                    </option>
                  ))}
                </select>
                <br />
              </div>

              <div className="form-group">
                <label>Select City: </label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    setVenueDetails({
                      ...venueDetails,
                      city: e.target.value,
                    });
                  }}
                >
                  {usaCityStates[venueDetails.venueState].map((ele, index) => (
                    <option value={ele} key={index}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>
              <br />
            </div>
            <div style={{ width: "700px" }}>
              <div className="text-center">
                <h5>Venue Availability</h5>
              </div>
              <div className="card card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Day</th>
                      <th scope="col">Opening Time</th>
                      <th scope="col">Closing Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Mon</th>
                      <td>
                        <Form.Select
                          onChange={(e) => {
                            const temp = mon;
                            temp[0] = parseInt(e.target.value);
                            setMon(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        {" "}
                        <Form.Select
                          onChange={(e) => {
                            const temp = mon;
                            temp[1] = parseInt(e.target.value);
                            setMon(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">Tue</th>
                      <td>
                        <Form.Select
                          onChange={(e) => {
                            const temp = tue;
                            temp[0] = parseInt(e.target.value);
                            setTue(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        {" "}
                        <Form.Select
                          onChange={(e) => {
                            const temp = tue;
                            temp[1] = parseInt(e.target.value);
                            setTue(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">Wed</th>
                      <td>
                        <Form.Select
                          onChange={(e) => {
                            const temp = wed;
                            temp[0] = parseInt(e.target.value);
                            setWed(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        {" "}
                        <Form.Select
                          onChange={(e) => {
                            const temp = wed;
                            temp[1] = parseInt(e.target.value);
                            setWed(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Thu</th>
                      <td>
                        <Form.Select
                          onChange={(e) => {
                            const temp = thu;
                            temp[0] = parseInt(e.target.value);
                            setThu(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        {" "}
                        <Form.Select
                          onChange={(e) => {
                            const temp = thu;
                            temp[1] = parseInt(e.target.value);
                            setThu(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Fri</th>
                      <td>
                        <Form.Select
                          onChange={(e) => {
                            const temp = fri;
                            temp[0] = parseInt(e.target.value);
                            setFri(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        {" "}
                        <Form.Select
                          onChange={(e) => {
                            const temp = fri;
                            temp[1] = parseInt(e.target.value);
                            setFri(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Sat</th>
                      <td>
                        <Form.Select
                          onChange={(e) => {
                            const temp = sat;
                            temp[0] = parseInt(e.target.value);
                            setSat(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        {" "}
                        <Form.Select
                          onChange={(e) => {
                            const temp = sat;
                            temp[1] = parseInt(e.target.value);
                            setSat(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Sun</th>
                      <td>
                        <Form.Select
                          onChange={(e) => {
                            const temp = sun;
                            temp[0] = parseInt(e.target.value);
                            setSun(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>
                        {" "}
                        <Form.Select
                          onChange={(e) => {
                            const temp = sun;
                            temp[1] = parseInt(e.target.value);
                            setSun(temp);
                          }}
                        >
                          <option>Open this select menu</option>
                          {time24.map((val, index) => (
                            <option value={index} key={index}>
                              {time24[index]}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mx-auto text-center">
            <button onClick={() => handleSubmit()} className="btn btn-success">
              Add Venue
            </button>
          </div>
        </div>
      ) : (
        <h1>Only Venue Owners can add venues</h1>
      )}
    </>
  );
};

export default VenueCreation;
