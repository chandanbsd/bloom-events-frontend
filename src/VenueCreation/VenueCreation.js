import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { usaCityStates, usStates, usCities } from "../constants/usaCityStates";
import time24 from "../constants/time24";
import baseURL from "../constants/constants";
import { useNavigate } from "react-router-dom";
import themeStyles from "../themeStyles";

const timeSlotNewInitial = [
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

const VenueCreation = () => {
  const userFromStore = useSelector((state) => state.user);
  let resSlots = "";
  for (let [key, val] of timeSlotNewInitial) {
    resSlots += key + "/" + -1 + ",";
  }
  resSlots = resSlots.slice(0, resSlots.length - 1);
  const navigate = useNavigate();
  const [venueDetails, setVenueDetails] = useState({
    venueHrCost: null,
    venueAddress: null,
    venueName: null,
    venueOpen: null,
    venueOwner: userFromStore.userName,
    venueDescription: null,
    venueCategory: null,
    venueCity: null,
    venueState: null,
    venueSlots: resSlots,
  });

  const themeFromStore = useSelector((state) => state.theme);

  const [mon, setMon] = useState([]);
  const [tue, setTue] = useState([]);
  const [wed, setWed] = useState([]);
  const [thu, setThu] = useState([]);
  const [fri, setFri] = useState([]);
  const [sat, setSat] = useState([]);
  const [sun, setSun] = useState([]);
  const [venueImage, setVenueImage] = useState(null);

  const postRequest = () => {
    let url = `${baseURL}/registervenue`;
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...venueDetails,
        venueImage,
        venueAvailability: {
          mon: mon,
          tue: tue,
          wed: wed,
          thu: thu,
          fri: fri,
          sat: sat,
          sun: sun,
        },
        creationDate: `${new Date().getUTCFullYear()}-${
          new Date().getUTCMonth() + 1
        }-${new Date().getUTCDate()}`,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        alert("Booking Sucessfull");
        navigate(`/venue-search`);
      });
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
    setVenueImage(base64);
  };

  const handleSubmit = () => {

    if (
      venueDetails.venueHrCost &&
      venueDetails.venueAddress &&
      venueDetails.venueName &&
      venueDetails.venueOpen &&
      venueDetails.venueOwner &&
      venueDetails.venueDescription &&
      venueDetails.venueCategory &&
      venueDetails.venueCity &&
      venueDetails.venueState &&
      venueDetails.venueSlots &&
      venueImage
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
          postRequest();
        } else {
          alert("Closing time cannot be before opening time");
        }
      }
    } else alert("Enter all details");
  };

  useEffect(() => {
  }, [venueDetails]);

  return (
    <div
      style={{ minHeight: "100vh" }}
      className={themeStyles[themeFromStore.value].body}
    >
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
                      venueState: e.target.value,
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
                {venueDetails.venueState != null ? (
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setVenueDetails({
                        ...venueDetails,
                        venueCity: e.target.value,
                      });
                    }}
                  >
                    {usaCityStates[venueDetails.venueState].map(
                      (ele, index) => {
                        return (
                          <option value={ele} key={index}>
                            {ele}
                          </option>
                        );
                      }
                    )}
                  </select>
                ) : (
                  <div>Select state first</div>
                )}
              </div>
              <br />
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
            </div>
            <div style={{ width: "700px" }}>
              <div className="text-center">
                <h5>Venue Availability</h5>
              </div>
              <div
                className={
                  "card card-body " +
                  themeStyles[themeFromStore.value].bodyHeavy +
                  " " +
                  themeStyles[themeFromStore.value].text
                }
              >
                <table className="table">
                  <thead className={themeStyles[themeFromStore.value].text}>
                    <tr>
                      <th scope="col">Day</th>
                      <th scope="col">Opening Time</th>
                      <th scope="col">Closing Time</th>
                    </tr>
                  </thead>
                  <tbody className={themeStyles[themeFromStore.value].text}>
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
                <div className="text-center">
                  <h1>Venue Layout Image</h1>
                  <img
                    className="card-img-top"
                    alt="Card Image"
                    src={venueImage}
                    style={{ width: "400px" }}
                  />
                </div>
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
    </div>
  );
};

export default VenueCreation;
