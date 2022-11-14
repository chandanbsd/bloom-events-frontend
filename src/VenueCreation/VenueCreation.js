import React, { useState } from "react";
import { useSelector } from "react-redux";
import { usaCityStates, usStates, usCities } from "../constants/usaCityStates";
const VenueCreation = () => {
  const userFromStore = useSelector((state) => state.user);

  const [venueDetails, setVenueDetails] = useState({
    venueAvailability: {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    },
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
    venueSlots: null,
  });

  const handleSubmit = () => {};
  return (
    <div className="mx-auto" style={{ width: "90vw" }}>
      <div className="mx-auto text-center mb-2">
        <h1>Add Your Venue</h1>
      </div>
      <div className="d-flex justify-content-around">
        <div style={{ width: "500px" }}>
          <div className="form-group">
            <div className="form-group">
              <label>Venue Owner</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  setVenueDetails({
                    ...venueDetails,
                    venueOwner: e.target.value,
                  })
                }
              />{" "}
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
                setVenueDetails({ ...venueDetails, venueOpen: e.target.value })
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
          <div>
            <button onClick={() => handleSubmit()} className="btn btn-success">
              Add Venue
            </button>
          </div>
        </div>
        <div style={{ width: "500px" }}>
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
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">Tue</th>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">Wed</th>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">Thu</th>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">Fri</th>

                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">Sat</th>

                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th scope="row">Sun</th>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCreation;
