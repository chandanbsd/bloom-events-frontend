import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearEvent, setEvent } from "../redux/event";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { usCities, usStates } from "../constants/usaCityStates";
import activityListMock from "../Mocks/activityListMock";
import { setActivity } from "../redux/activity";
import baseURL from "../constants/constants";

let dateObj = new Date();
let today = [
  dateObj.getUTCFullYear(),
  dateObj.getUTCMonth() + 1,
  dateObj.getUTCDate(),
];

console.log(today);
const ActivitySearch = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activityList, setActivityList] = useState([]);
  const [filteredActivityList, setFilteredActivityList] = useState([]);

  const activityFromStore = useSelector((state) => state.activity);
  const dispatch = useDispatch();

  const processSearch = async () => {
    if (searchKeyword === "" || searchKeyword === undefined)
      setFilteredActivityList([...activityList]);
    else {
      setFilteredActivityList(
        activityList.filter((ele) =>
          ele.activityName.toLowerCase().startsWith(searchKeyword.toLowerCase())
        )
      );
    }
  };

  const handleCityFilter = (e) => {
    if (e === "Any") setFilteredActivityList([...activityList]);
    else {
      setFilteredActivityList(
        activityList.filter((ele) => ele.activityCity === e)
      );
    }
  };

  const handleStateFilter = (e) => {
    if (e === "Any") setFilteredActivityList([...activityList]);
    else {
      setFilteredActivityList(
        activityList.filter((ele) => ele.activityState === e)
      );
    }
  };

  const handleCategoryFilter = (e) => {
    if (e === "Any") setFilteredActivityList([...activityList]);
    else {
      setFilteredActivityList(
        activityList.filter((ele) => ele.activityCategory === e)
      );
    }
  };

  const handleAgeRangeFilter = (e) => {
    if (e === "Any") setFilteredActivityList([...activityList]);
    else if (e === "A18") {
      setFilteredActivityList(
        activityList.filter(
          (ele) =>
            ele.activityAgeRange === "A18" || ele.activityAgeRange === "A65"
        )
      );
    } else {
      setFilteredActivityList(
        activityList.filter((ele) => ele.activityAgeRange === e)
      );
    }
  };

  const handleCostFilter = (e) => {
    if (e === "Any") setFilteredActivityList([...activityList]);
    else {
      setFilteredActivityList(
        activityList.filter((ele) => ele.activityCost === e)
      );
    }
  };

  useEffect(() => {
    const url = `${baseURL}/ra`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        if (res.status === "OK") {
          console.log(res);

          dispatch(setActivity([...res.body]));
          setActivityList(
            JSON.parse(JSON.stringify(activityFromStore.activityList))
          );
          setFilteredActivityList(
            JSON.parse(JSON.stringify(activityFromStore.activityList))
          );
        } else alert("Unable to fetch event venues");
      })
      .catch((error) => console.log("Form submit error", error));
  }, []);

  // window.onload = async () => {
  //   console.log([...activityListMock]);
  //   await dispatch(setActivity([...activityListMock]));
  //   await setActivityList(
  //     JSON.parse(JSON.stringify(activityFromStore.activityList))
  //   );
  //   await setFilteredActivityList(
  //     JSON.parse(JSON.stringify(activityFromStore.activityList))
  //   );
  // };

  return (
    <div>
      <h1 className="mx-auto text-center">Search Activities</h1>
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
                {/* <Dropdown.Item eventKey={"Indiana"}>Indiana</Dropdown.Item>
            <Dropdown.Item eventKey={"Tennessee"}>Tennessee</Dropdown.Item>
            <Dropdown.Item eventKey={"Texas"}>Texas</Dropdown.Item> */}
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

          <Dropdown>
            <DropdownButton
              variant="success"
              id="dropdown-basic"
              onSelect={(e) => {
                handleAgeRangeFilter(e);
              }}
              title="Select Age Range"
            >
              <Dropdown.Item eventKey={"Any"}>Any</Dropdown.Item>
              <Dropdown.Item eventKey={"A65"}>Above 65</Dropdown.Item>
              <Dropdown.Item eventKey={"A18"}>Above 18</Dropdown.Item>
              <Dropdown.Item eventKey={"B18"}>Below 18</Dropdown.Item>
            </DropdownButton>
          </Dropdown>

          <Dropdown>
            <DropdownButton
              variant="success"
              id="dropdown-basic"
              onSelect={(e) => {
                handleCostFilter(e);
              }}
              title="Select Cost"
            >
              <Dropdown.Item eventKey={"Any"}>Any</Dropdown.Item>
              <Dropdown.Item eventKey={"Free"}>Free</Dropdown.Item>
              <Dropdown.Item eventKey={"Paid"}>Paid</Dropdown.Item>
            </DropdownButton>
          </Dropdown>
        </div>
      </div>

      <div className="mx-auto mt-5" style={{ width: "50%" }}>
        {filteredActivityList.map((val, index) => {
          return (
            <div className="card mb-2 p-3" key={index}>
              <div className="card-body d-flex justify-content-around">
                <div>
                  <h5 className="card-title">Name: {val.activityName}</h5>
                  <p className="card-text">
                    Description: {val.activityDescription}
                  </p>
                  <p className="card-text">
                    Organizer: {val.activityOrganizer}
                  </p>

                  <p className="card-text">
                    Venue Name: {val.activityVenueName}
                  </p>

                  <p className="card-text">
                    Venue Address: {val.activityVenueAddress}
                  </p>

                  <p className="card-text">Location: {val.activityLocation}</p>

                  <p className="card-text">
                    Age Range:{" "}
                    {val.activityAgeRange === "A65"
                      ? "Above 65"
                      : val.activityAgeRange === "A18"
                      ? "Above 18"
                      : "Below 18"}
                  </p>

                  <p className="card-text">Category: {val.activityCategory}</p>

                  <p className="card-text">City: {val.activityCity}</p>

                  <p className="card-text">State: {val.activityState}</p>

                  <p className="card-text">Cost: {val.activityCost}</p>
                  {/* <img className="card-img-top" alt="Card Image" /> */}
                </div>
                <div className="align-self-center">
                  <p className="card-text align-self-center">
                    <b>Date:</b> {val.activityDate.join("-")}
                    <br />
                    <br />
                    <b>Time:</b>{" "}
                    {`${val.activityTime[1]} - ${val.activityTime[2]}`}
                  </p>
                </div>
              </div>
              <div className="mx-auto">
                {new Date(val.activityDate.join("-")) <
                new Date(today.join("-")) ? (
                  "Closed"
                ) : (
                  <button className="btn btn-success">Register</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivitySearch;
