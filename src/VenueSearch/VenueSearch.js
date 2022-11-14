import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearEvent, setEvent } from "../redux/event";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { usCities, usStates } from "../constants/usaCityStates";
import baseURL from "../constants/constants";
import { Link } from "react-router-dom";
import time24 from "../constants/time24";
import themeStyles from "../themeStyles";
import { usaCityStates } from "../constants/usaCityStates";
const VenueSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [eventList, setEventList] = useState([]);
  const [filteredEventList, setFilteredEventList] = useState(null);
  const eventFromStore = useSelector((state) => state.event);
  const userFromStore = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const themeFromStore = useSelector((state) => state.theme);
  const [stateFilter, setStateFilter] = useState(null);

  const processSearch = async () => {
    if (searchKeyword === "" || searchKeyword === undefined)
      setFilteredEventList([...eventList]);
    else {
      setFilteredEventList(
        eventList.filter((ele) =>
          ele.venueName.toLowerCase().startsWith(searchKeyword.toLowerCase())
        )
      );
    }
  };

  const handleCityFilter = (e) => {
    if (e === "Any") setFilteredEventList([...eventList]);
    else {
      setFilteredEventList(eventList.filter((ele) => ele.venueCity === e));
    }
  };

  const handleStateFilter = (e) => {
    if (e === "Any") setFilteredEventList([...eventList]);
    else {
      setFilteredEventList(eventList.filter((ele) => ele.venueState === e));
    }
  };

  const handleCategoryFilter = (e) => {
    if (e === "Any") setFilteredEventList([...eventList]);
    else {
      setFilteredEventList(eventList.filter((ele) => ele.venueCategory === e));
    }
  };

  const handleOpenClose = (venueId, venueOpen) => {
    let newOpen = venueOpen == "true" ? "false" : "true";
    console.log(venueId, venueOpen, newOpen);
    const url = `${baseURL}/venueopenclose`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        venueId: venueId,
        venueOpen: newOpen,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status == "OK") {
          alert("Update Successfull");
          fetchVenueHandler();
          window.location.reload();
        } else {
          alert("Update Failed");
        }
      });
  };

  const fetchVenueHandler = () => {
    const url = `${baseURL}/venuelist`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        if (res.status === "OK") {
          res.body.forEach((val, index) => {
            val.venueAvailability = JSON.parse(
              val.venueAvailability.replace(/'/g, '"')
            );

            for (let [key, value] of Object.entries(val.venueSlots)) {
              let valueArray = value.split(",");
              valueArray = valueArray.map((val) => val.split("/"));

              res.body[index].venueSlots[key] = valueArray;
            }
          });

          if (userFromStore != null && userFromStore.isOwner == "true") {
            dispatch(
              setEvent(
                JSON.parse(
                  JSON.stringify(
                    res.body.filter(
                      (val) => val.venueOwner == userFromStore.userName
                    )
                  )
                )
              )
            );
            setEventList(JSON.parse(JSON.stringify(eventFromStore.eventList)));
            setFilteredEventList(
              JSON.parse(JSON.stringify(eventFromStore.eventList))
            );
          } else {
            dispatch(setEvent(JSON.parse(JSON.stringify(res.body))));
            setEventList(JSON.parse(JSON.stringify(eventFromStore.eventList)));
            setFilteredEventList(
              JSON.parse(JSON.stringify(eventFromStore.eventList))
            );
          }
        } else alert("Unable to fetch event venues");
      })
      .catch((error) => console.log("Form submit error", error));
  };

  useEffect(() => {
    if (filteredEventList == null) fetchVenueHandler();
  }, [filteredEventList]);

  return (
    <>
      {filteredEventList != null ? (
        <div className={themeStyles[themeFromStore.value].body}>
          <h1 className={"mx-auto text-center "}>
            {userFromStore?.isOwner == "true"
              ? "Manage Your Venues"
              : "Search Event Venues"}
          </h1>
          <div>
            <div
              style={{ display: "flex", width: "50%" }}
              className="mx-auto pt-5"
            >
              <input
                type="search"
                className="form-control"
                style={{ display: "inline-block" }}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                }}
              />
              <button
                className="btn btn-primary"
                onClick={processSearch}
                style={{ display: "inline-block" }}
              >
                Search
              </button>
            </div>

            <div
              className="form-group mx-auto mt-5"
              style={{
                width: "900px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Dropdown>
                <DropdownButton
                  variant="success"
                  id="dropdown-basic"
                  onSelect={(e) => {
                    handleStateFilter(e);
                    setStateFilter(e);
                  }}
                  title="Select State"
                >
                  <Dropdown.Menu
                    style={{ maxHeight: "500px", overflow: "scroll" }}
                  >
                    <Dropdown.Item eventKey={"Any"}>Any</Dropdown.Item>
                    {Object.keys(usaCityStates).map((ele, index) => (
                      <Dropdown.Item eventKey={ele} key={index}>
                        {ele}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </DropdownButton>
              </Dropdown>

              <Dropdown>
                <DropdownButton
                  variant="success"
                  id="dropdown-basic"
                  onSelect={(e) => {
                    handleCityFilter(e);
                  }}
                  title="Select City"
                >
                  <Dropdown.Menu
                    style={{ maxHeight: "500px", overflowY: "scroll" }}
                  >
                    <Dropdown.Item eventKey={"Any"}>Any</Dropdown.Item>
                    {stateFilter !== null &&
                      usaCityStates[stateFilter]?.map((ele, index) => (
                        <Dropdown.Item eventKey={ele} key={index}>
                          {ele}
                        </Dropdown.Item>
                      ))}
                    {stateFilter === null && (
                      <Dropdown.Item eventKey={"Any"}>
                        Select state first
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </DropdownButton>
              </Dropdown>

              <Dropdown>
                <DropdownButton
                  variant="success"
                  id="dropdown-basic"
                  onSelect={(e) => {
                    handleCategoryFilter(e);
                  }}
                  title="Select Category"
                >
                  <Dropdown.Item eventKey={"Any"}>Any</Dropdown.Item>
                  <Dropdown.Item eventKey={"Music"}>Music</Dropdown.Item>
                  <Dropdown.Item eventKey={"Sports"}>Sports</Dropdown.Item>
                  <Dropdown.Item eventKey={"Comedy"}>Comedy</Dropdown.Item>
                </DropdownButton>
              </Dropdown>
            </div>
          </div>

          <div className="mx-auto mt-5" style={{ width: "50%" }}>
            {filteredEventList.map((val, index) => {
              return (
                <div
                  className={
                    "card mb-2 p-3 " +
                    themeStyles[themeFromStore.value].bodyHeavy +
                    " " +
                    themeStyles[themeFromStore.value].text
                  }
                  key={index}
                >
                  <div className="card-body d-flex justify-content-around">
                    <div>
                      <h5 className="card-title">Name: {val.venueName}</h5>
                      <p className="card-text">
                        Description: {val.venueDescription}
                      </p>
                      <p className="card-text">Address: {val.venueAddress}</p>
                      <p className="card-text">Owner: {val.venueOwner}</p>
                      <p className="card-text">Cost/hr: ${val.venueHrCost}</p>
                      <p className="card-text">Category: {val.venueCategory}</p>
                      <p className="card-text">City: {val.venueCity}</p>
                      <p className="card-text">State: {val.venueState}</p>

                      {/* <img className="card-img-top" alt="Card Image" /> */}
                    </div>
                    <div className="align-self-center">
                      <div>
                        <table
                          className={
                            "table " +
                            themeStyles[themeFromStore.value].bodyHeavy +
                            " " +
                            themeStyles[themeFromStore.value].text
                          }
                        >
                          <tbody>
                            <tr>
                              <th>Day</th>
                              <th>Time</th>
                            </tr>
                            <tr>
                              <td>Monday</td>
                              <td>{`${time24[val.venueAvailability.mon[0]]} - ${
                                time24[val.venueAvailability.mon[1]]
                              }`}</td>
                            </tr>
                            <tr>
                              <td>Tuesday</td>
                              <td>{` ${
                                time24[val.venueAvailability.tue[0]]
                              } - ${time24[val.venueAvailability.tue[1]]}`}</td>
                            </tr>
                            <tr>
                              <td>Wednesday</td>
                              <td>{`${time24[val.venueAvailability.wed[0]]} - ${
                                time24[val.venueAvailability.wed[1]]
                              }`}</td>
                            </tr>
                            <tr>
                              <td>Thursday</td>
                              <td>{`${time24[val.venueAvailability.thu[0]]} - ${
                                time24[val.venueAvailability.thu[1]]
                              }`}</td>
                            </tr>
                            <tr>
                              <td>Friday</td>
                              <td>{`${time24[val.venueAvailability.fri[0]]} - ${
                                time24[val.venueAvailability.fri[1]]
                              }`}</td>
                            </tr>
                            <tr>
                              <td>Saturday</td>
                              <td>{`${time24[val.venueAvailability.sat[0]]} - ${
                                time24[val.venueAvailability.sat[1]]
                              }`}</td>
                            </tr>
                            <tr>
                              <td>Sunday</td>
                              <td>{`${time24[val.venueAvailability.sun[0]]} - ${
                                time24[val.venueAvailability.sun[1]]
                              }`}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="mx-auto">
                    {val.venueOpen == "true" ? (
                      <button className="btn btn-success">
                        <Link
                          to={{
                            pathname: `venue-details/${val.venueId}`,
                          }}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          Reserve Time
                        </Link>
                      </button>
                    ) : (
                      <button className="btn btn-warning m-2">
                        Closed by Venue Owner
                      </button>
                    )}

                    {/* {userFromStore != null &&
                    val.venueAvailability.venueOpen == "false" ? (
                      <button
                        className="btn btn-primary m-2"
                        onClick={() =>
                          handleOpenClose(
                            val.venueId,
                            val.venueAvailability.venueOpen
                          )
                        }
                      >
                        Open Booking{" "}
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger m-2"
                        onClick={() =>
                          handleOpenClose(
                            val.venueId,
                            val.venueAvailability.venueOpen
                          )
                        }
                      >
                        Close Bookings
                      </button>
                    )} */}
                    {userFromStore != null &&
                      userFromStore.userName == val.venueOwner && (
                        <>
                          {val.venueOpen == "false" ? (
                            <button
                              className="btn btn-primary m-2"
                              onClick={() => {
                                handleOpenClose(val.venueId, val.venueOpen);
                              }}
                            >
                              Open Booking{" "}
                            </button>
                          ) : (
                            <button
                              className="btn btn-danger m-2"
                              onClick={() => {
                                handleOpenClose(val.venueId, val.venueOpen);
                              }}
                            >
                              Close Bookings
                            </button>
                          )}
                        </>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default VenueSearch;
