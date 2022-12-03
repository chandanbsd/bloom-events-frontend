import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { usCities, usStates } from "../constants/usaCityStates";
import { setParticipant, clearParticipant } from "../redux/participant";
import participantListMock from "../Mocks/userListMock";
import baseURL from "../constants/constants";
import { usaCityStates } from "../constants/usaCityStates";
import themeStyles from "../themeStyles";

const ParticipantSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [participantList, setParticipantList] = useState([]);
  const [filteredParticipantList, setFilteredParticipantList] = useState([]);

  const participantFromStore = useSelector((state) => state.participant);
  const dispatch = useDispatch();
  const [stateFilter, setStateFilter] = useState(null);
  const themeFromStore = useSelector((state) => state.theme);

  const processSearch = async () => {
    if (searchKeyword === "" || searchKeyword === undefined)
      setFilteredParticipantList([...participantList]);
    else {
      setFilteredParticipantList(
        participantList.filter(
          (ele) =>
            ele.userName
              .toLowerCase()
              .startsWith(searchKeyword.toLowerCase()) ||
            ele.firstName
              .toLowerCase()
              .startsWith(searchKeyword.toLowerCase()) ||
            ele.lastName.toLowerCase().startsWith(searchKeyword.toLowerCase())
        )
      );
    }
  };

  const handleCityFilter = (e) => {
    if (e === "Any") setFilteredParticipantList([...participantList]);
    else {
      setFilteredParticipantList(
        participantList.filter((ele) => ele.city === e)
      );
    }
  };

  const handleStateFilter = (e) => {
    if (e === "Any") setFilteredParticipantList([...participantList]);
    else {
      setFilteredParticipantList(
        participantList.filter((ele) => ele.state === e)
      );
    }
  };

  const handleCategoryFilter = (e) => {
    if (e === "Any") setFilteredParticipantList([...participantList]);
    else {
      setFilteredParticipantList(
        participantList.filter((ele) => ele.categoryType === e)
      );
    }
  };

  const handleAgeRangeFilter = (e) => {
    if (e === "Any") setFilteredParticipantList([...participantList]);
    else if (e === "A18") {
      setFilteredParticipantList(
        participantList.filter((ele) => ele.age === "A18" || ele.age === "A65")
      );
    } else {
      setFilteredParticipantList(
        participantList.filter((ele) => ele.age === "A65")
      );
    }
  };

  const handleGenderFilter = (e) => {
    if (e === "Any") setFilteredParticipantList([...participantList]);
    else {
      setFilteredParticipantList(
        participantList.filter((ele) => ele.gender === e)
      );
    }
  };

  const handleLevelFilter = (e) => {
    if (e === "Any") setFilteredParticipantList([...participantList]);
    else {
      setFilteredParticipantList(
        participantList.filter((ele) => ele.categoryLevel === e)
      );
    }
  };

  const handleAvailabilityFilter = (e) => {
    if (e === "Any") setFilteredParticipantList([...participantList]);
    else {
      setFilteredParticipantList(
        participantList.filter((ele) => ele.isAvailable === e)
      );
    }
  };

  useEffect(() => {
    const url = `${baseURL}/ru`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log(res);
        if (res.status === "OK") {
          // res.body.forEach((val) => {
          //   val.venueAvailability = JSON.parse(
          //     val.venueAvailability.replace(/'/g, '"')
          //   );
          // });

          dispatch(setParticipant([...res.body]));
          setParticipantList(
            JSON.parse(JSON.stringify(participantFromStore.participantList))
          );
          setFilteredParticipantList(
            JSON.parse(JSON.stringify(participantFromStore.participantList))
          );
        }
      })
      .catch((error) => console.log("Form submit error", error));
  }, []);

  // window.onload = async () => {
  //   await dispatch(setParticipant([...participantListMock]));
  //   await setParticipantList(
  //     JSON.parse(JSON.stringify(participantFromStore.participantList))
  //   );
  //   await setFilteredParticipantList(
  //     JSON.parse(JSON.stringify(participantFromStore.participantList))
  //   );
  // };

  return (
    <div
      style={{ minHeight: "100vh" }}
      className={themeStyles[themeFromStore.value].body}
    >
      <h1 className="mx-auto text-center">Search Users</h1>
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
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch(clearParticipant());
            }}
          >
            Clear
          </button>
        </div>

        <div
          className="form-group mx-auto mt-5"
          style={{
            width: "1200px",
            display: "flex",
            justifyContent: "space-around",
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
              <Dropdown.Menu style={{ maxHeight: "500px", overflow: "scroll" }}>
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
                handleGenderFilter(e);
              }}
              title="Select Gender"
            >
              <Dropdown.Item eventKey={"Any"}>Any</Dropdown.Item>
              <Dropdown.Item eventKey={"Male"}>Male</Dropdown.Item>
              <Dropdown.Item eventKey={"Female"}>Female</Dropdown.Item>
            </DropdownButton>
          </Dropdown>

          <Dropdown>
            <DropdownButton
              variant="success"
              id="dropdown-basic"
              onSelect={(e) => {
                handleLevelFilter(e);
              }}
              title="Select Interest Level"
            >
              <Dropdown.Item eventKey={"Any"}>Any</Dropdown.Item>
              <Dropdown.Item eventKey={"Beginner"}>Beginner</Dropdown.Item>
              <Dropdown.Item eventKey={"Intermediate"}>
                Intermediate
              </Dropdown.Item>
              <Dropdown.Item eventKey={"Advanced"}>Advanced</Dropdown.Item>
            </DropdownButton>
          </Dropdown>

          <Dropdown>
            <DropdownButton
              variant="success"
              id="dropdown-basic"
              onSelect={(e) => {
                handleAvailabilityFilter(e);
              }}
              title="Select Availability"
            >
              <Dropdown.Item eventKey={"Any"}>Any</Dropdown.Item>
              <Dropdown.Item eventKey={"Yes"}>Yes</Dropdown.Item>
              <Dropdown.Item eventKey={"No"}>No</Dropdown.Item>
            </DropdownButton>
          </Dropdown>
        </div>
      </div>

      <div className="mx-auto mt-5" style={{ width: "50%" }}>
        {filteredParticipantList.map((val, index) => {
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
                <div style={{ width: "60%" }}>
                  <h5 className="card-title">Username: {val.userName}</h5>
                  <p className="card-text">
                    Full Name: {val.firstName} {val.lastName}
                  </p>
                  <p className="card-text">Bio: {val.bio}</p>
                  <p>Favorite Events: {val.categoryType}</p>
                  <p>Skill Level: {val.categoryLevel}</p>
                </div>
                <div>
                  <p>
                    Age Range:{" "}
                    {val.age === "A65"
                      ? "Above 65"
                      : val.age === "A18"
                      ? "Above 18"
                      : "Below 18"}
                  </p>
                  <p>Gender: {val.gender === "Male" ? "Male" : "Female"}</p>
                  <p>Available: {val.isAvailable === "Yes" ? "Yes" : "No"}</p>
                  <p>City: {val.city}</p>

                  <p>State: {val.state}</p>
                </div>
                {/* <div>
                  <img className="card-img-top" alt="Card Image" />
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParticipantSearch;
