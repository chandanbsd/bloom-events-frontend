import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearEvent, setEvent } from "../redux/event";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { usCities, usStates } from "../constants/usaCityStates";
import baseURL from "../constants/constants";
import { Link } from "react-router-dom";

const VenueSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [eventList, setEventList] = useState([]);
  const [filteredEventList, setFilteredEventList] = useState([]);
  const eventFromStore = useSelector((state) => state.event);
  const dispatch = useDispatch();

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

  useEffect(() => {
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
            // val.venueSlots = val.venueSlots.map(val)

            for (let [key, value] of Object.entries(val.venueSlots)) {
              let valueArray = value.split(",");
              valueArray = valueArray.map((val) => val.split("/"));

              res.body[index].venueSlots = valueArray;
            }
          });

          console.log(res.body);
          dispatch(setEvent([...res.body]));
          setEventList(JSON.parse(JSON.stringify(eventFromStore.eventList)));
          setFilteredEventList(
            JSON.parse(JSON.stringify(eventFromStore.eventList))
          );
        } else alert("Unable to fetch event venues");
      })
      .catch((error) => console.log("Form submit error", error));
  }, []);

  return (
    <div>
      <h1 className="mx-auto text-center">Search Event Venues</h1>
      <div>
        <div style={{ display: "flex", width: "50%" }} className="mx-auto pt-5">
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
        {/* <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(clearEvent());
          }}
        >
          Clear
        </button> */}
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
                handleCityFilter(e);
              }}
              title="Select City"
            >
              <Dropdown.Menu
                style={{ maxHeight: "500px", overflowY: "scroll" }}
              >
                <Dropdown.Item eventKey={"Any"}>Any</Dropdown.Item>
                {usCities.map((ele, index) => (
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
                handleStateFilter(e);
              }}
              title="Select State"
            >
              <Dropdown.Menu style={{ maxHeight: "500px", overflow: "scroll" }}>
                <Dropdown.Item eventKey={"Any"}>Any</Dropdown.Item>
                {usStates.map((ele, index) => (
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
            <div className="card mb-2 p-3" key={index}>
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
                    <table className="table">
                      <tbody>
                        <tr>
                          <th>Day</th>
                          <th>Time</th>
                        </tr>
                        <tr>
                          <td>Monday</td>
                          <td>{`${val.venueAvailability.mon[0]} - ${val.venueAvailability.mon[1]}`}</td>
                        </tr>
                        <tr>
                          <td>Tuesday</td>
                          <td>{`${val.venueAvailability.tue[0]} - ${val.venueAvailability.tue[1]}`}</td>
                        </tr>
                        <tr>
                          <td>Wednesday</td>
                          <td>{`${val.venueAvailability.wed[0]} - ${val.venueAvailability.wed[1]}`}</td>
                        </tr>
                        <tr>
                          <td>Thursday</td>
                          <td>{`${val.venueAvailability.thu[0]} - ${val.venueAvailability.thu[1]}`}</td>
                        </tr>
                        <tr>
                          <td>Friday</td>
                          <td>{`${val.venueAvailability.fri[0]} - ${val.venueAvailability.fri[1]}`}</td>
                        </tr>
                        <tr>
                          <td>Saturday</td>
                          <td>{`${val.venueAvailability.sat[0]} - ${val.venueAvailability.sat[1]}`}</td>
                        </tr>
                        <tr>
                          <td>Sunday</td>
                          <td>{`${val.venueAvailability.sun[0]} - ${val.venueAvailability.sun[1]}`}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mx-auto">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VenueSearch;
