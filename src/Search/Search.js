import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearEvent, setEvent } from "../redux/event";

const mock = [
  {
    venueAvailability: "Monday: [08AM, 07PM],Tuesday: [09AM, 09PM]",
    venueHrCost: 400,
    venueId: "0",
    venueLocation: "5A N kinserPike , Bloomington, 47404",
    venueName: "SRSC",
    venueOpen: "true",
    venueOwner: "chandanbsd",
    categoryType: 0,
  },
  {
    venueAvailability: "Monday: [08AM, 07PM],Tuesday: [09AM, 09PM]",
    venueHrCost: 400,
    venueId: "0",
    venueLocation: "5A N kinserPike , Bloomington, 47404",
    venueName: "SRSC",
    venueOpen: "true",
    venueOwner: "chandanbsd",
    categoryType: 1,
  },
];

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState(null);
  const eventFromStore = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const processSearch = () => {
    dispatch(setEvent([...mock]));
    console.log(eventFromStore.eventList);
  };

  return (
    <div style={{ width: "500px" }} className="mx-auto mt-5">
      <h1 className="">Search Event Venues</h1>
      <div className="form-group">
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
    </div>
  );
};

export default Search;
