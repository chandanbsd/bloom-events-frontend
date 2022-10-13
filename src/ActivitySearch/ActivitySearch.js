import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearEvent, setEvent } from "../redux/event";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { usCities, usStates } from "../constants/usaCityStates";
import activityListMock from "../Mocks/activityListMock";

const ActivitySearch = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [eventList, setEventList] = useState([]);
  const [filteredEventList, setFilteredEventList] = useState([]);
  const locations = ["Bloomington", "Indianapolis", "Greenwood"];
  const categories = ["Sport", "Music"];

  const eventFromStore = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const processSearch = async () => {
    if (searchKeyword === "" || searchKeyword === undefined)
      setFilteredEventList([...eventList]);
    else {
      setFilteredEventList(
        eventList.filter((ele) =>
          ele.activityName.toLowerCase().startsWith(searchKeyword.toLowerCase())
        )
      );
    }
  };

  const handleCityFilter = (e) => {
    if (e === "Any") setFilteredEventList([...eventList]);
    else {
      setFilteredEventList(eventList.filter((ele) => ele.activityCity === e));
    }
  };

  const handleStateFilter = (e) => {
    if (e === "Any") setFilteredEventList([...eventList]);
    else {
      setFilteredEventList(eventList.filter((ele) => ele.activityState === e));
    }
  };

  const handleCategoryFilter = (e) => {
    if (e === "Any") setFilteredEventList([...eventList]);
    else {
      setFilteredEventList(eventList.filter((ele) => ele.categoryType === e));
    }
  };

  const handleAgeRangeFilter = (e) => {
    if (e === "Any") setFilteredEventList([...eventList]);
    else if (e === "A18") {
      setFilteredEventList(
        eventList.filter(
          (ele) =>
            ele.activityAgeRange === "A18" || ele.activityAgeRange === "A65"
        )
      );
    } else {
      setFilteredEventList(
        eventList.filter((ele) => ele.activityAgeRange === "A65")
      );
    }
  };

  const handleCostFilter = (e) => {
    if (e === "Any") setFilteredEventList([...eventList]);
    else {
      setFilteredEventList(eventList.filter((ele) => ele.activityCost === e));
    }
  };

  window.onload = async () => {
    await dispatch(setEvent([...activityListMock]));
    await setEventList(JSON.parse(JSON.stringify(eventFromStore.eventList)));
    await setFilteredEventList(
      JSON.parse(JSON.stringify(eventFromStore.eventList))
    );
  };

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
        {filteredEventList.map((val, index) => {
          return (
            <div className="card mb-2 p-3" key={index}>
              <div className="card-body d-flex justify-content-around">
                <div>
                  <h5 className="card-title">Name: {val.activityName}</h5>
                  <p className="card-text">
                    Description: {val.activityDescription}
                  </p>
                  <p>Address: {val.activityLocation}</p>
                  <p>
                    Age Range:{" "}
                    {val.activityAgeRange === "A65"
                      ? "Above 65"
                      : val.activityAgeRange === "A18"
                      ? "Above 18"
                      : "Below 18"}
                  </p>
                  <img className="card-img-top" alt="Card Image" />
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
                          <td>{`${val.activityAvailability[0]}`}</td>
                          <td>{`${val.activityAvailability[1]} - ${val.activityAvailability[2]}`}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mx-auto">
                <button className="btn btn-success">Reserve Time</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivitySearch;
