import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearEvent, setEvent } from "../redux/event";

const mock = [
  {
    venueAvailability: {
      mon: ["08AM", "07PM"],
      tue: ["09AM", "07PM"],
      wed: ["08AM", "07PM"],
      thu: ["08AM", "07PM"],
      fri: ["08AM", "07PM"],
      sat: ["08AM", "07PM"],
      sun: ["08AM", "07PM"],
    },
    venueHrCost: 400,
    venueId: "0",
    venueLocation: "5A N kinserPike , Bloomington, 47404",
    venueName: "Bill Garett fielhouse",
    venueOpen: "true",
    venueOwner: "chandanbsd",
    venueDescription: "The best sports venue in town",
    categoryType: 0,
  },
  {
    venueAvailability: {
      mon: ["08AM", "07PM"],
      tue: ["08AM", "07PM"],
      wed: ["08AM", "07PM"],
      thu: ["08AM", "07PM"],
      fri: ["08AM", "07PM"],
      sat: ["08AM", "07PM"],
      sun: ["08AM", "07PM"],
    },
    venueHrCost: 400,
    venueId: "0",
    venueLocation: "5A N kinserPike , Bloomington, 47404",
    venueName: "SRSC",
    venueOpen: "true",
    venueOwner: "chandanbsd",
    venueDescription: "The best sports venue in town",
    categoryType: 1,
  },
];

const Search = () => {
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

  window.onload = async () => {
    await dispatch(setEvent([...mock]));
    await setEventList(JSON.parse(JSON.stringify(eventFromStore.eventList)));
  };

  return (
    <div>
      <h1 className="mx-auto text-center">Search Event Venues</h1>
      <div className="form-group mx-auto mt-5" style={{ width: "500px" }}>
        <input
          type="search"
          className="form-control"
          style={{ display: "inline-block", width: "70%" }}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
        />
        <button className="btn btn-primary" onClick={processSearch}>
          Search
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(clearEvent());
          }}
        >
          Clear
        </button>
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
                  <p>Address: {val.venueLocation}</p>
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
                <button className="btn btn-success">Reserve Time</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
