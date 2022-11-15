import React, { useEffect, useState } from "react";
import baseURL from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import activity, { clearActivity, setActivity } from "../redux/activity";
import { clearEvent, setEvent } from "../redux/event";
import { Link } from "react-router-dom";
import { setUser } from "../redux/user";

const Bookmarks = () => {
  const eventFromStore = useSelector((state) => state.event);
  const userFromStore = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [venueBookmarks, setVenueBookmarks] = useState(null);
  const [activityBookmarks, setActivityBookmarks] = useState(null);
  const [filteredEventList, setFilteredEventList] = useState(null);
  const [filteredActivityList, setFilteredActivityList] = useState(null);
  const activityFromStore = useSelector((state) => state.activity);
  const [fetchComplete, setFetchComplete] = useState(0);

  useEffect(() => {
    if (venueBookmarks == null && activityBookmarks == null) {
      let url = `${baseURL}/getbookmark`;
      let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userFromStore.userName,
        }),
      };

      fetch(url, requestOptions)
        .then((response) => response.json())

        .then((res) => {
          if (res.status === "OK") {
            console.log(res.body);
            setVenueBookmarks(res.body.favVenue);
            setActivityBookmarks(res.body.favActivity);
          } else alert("Unable to fetch bookmarks");
          return true;
        });
    }

    if (venueBookmarks !== null && filteredEventList === null) {
      let url = `${baseURL}/venuelist`;
      let requestOptions = {
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

            dispatch(setEvent([...res.body]));
          } else alert("Unable to fetch event venues");
        })
        .then((res) =>
          setFilteredEventList(
            JSON.parse(JSON.stringify(eventFromStore.eventList)).filter((ele) =>
              venueBookmarks.includes(ele.venueId)
            )
          )
        );
    }

    if (filteredActivityList == null && activityBookmarks !== null) {
      const url = `${baseURL}/ra`;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(url, requestOptions)
        .then((response) => response.json())

        .then((res) => {
          if (res.status === "OK") {
            dispatch(setActivity([...res.body]));

            setFilteredActivityList(
              JSON.parse(JSON.stringify(activityFromStore.activityList)).filter(
                (ele) => activityBookmarks.includes(ele.activityId)
              )
            );
          } else alert("Unable to fetch activities");
        });
    }
  }, [
    venueBookmarks,
    activityBookmarks,
    filteredActivityList,
    filteredEventList,
  ]);

  return (
    <div>
      {venueBookmarks !== null &&
      activityBookmarks !== null &&
      filteredActivityList != null &&
      filteredEventList != null ? (
        <div>
          <div className="card mb-2 p-3 mx-auto mt-2" style={{ width: "50%" }}>
            <div className="align-self-center" style={{ width: "100%" }}>
              <h1>Bookmarked Venues</h1>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Venue Name</th>
                    <th>Link to Venue</th>
                  </tr>

                  {venueBookmarks.map((ele, index) => (
                    <tr key={index}>
                      <td>{filteredEventList[ele].venueName}</td>
                      <td>
                        {" "}
                        <button className="btn btn-primary">
                          <Link
                            to={{
                              pathname: `/venue-search/venue-details/${ele}`,
                            }}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            Go to Venue
                          </Link>{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card mb-2 p-3 mx-auto" style={{ width: "50%" }}>
            <div className="align-self-center" style={{ width: "100%" }}>
              <h1>Bookmarked Activities</h1>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Activity Name</th>
                    <th>Link to Activity</th>
                  </tr>
                  {activityBookmarks.map((ele, index) => (
                    <tr key={index}>
                      <td>{filteredActivityList[index].activityName}</td>
                      <td>
                        <button className="btn btn-primary">
                          <Link
                            to={{
                              pathname: `/activity-search/activity-details/${ele}`,
                            }}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            Go to Activity
                          </Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx_auto text-center">Loading.....</div>
      )}
    </div>
  );
};

export default Bookmarks;
