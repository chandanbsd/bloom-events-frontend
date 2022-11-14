import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import baseURL from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import user, { setProfile } from "../redux/user";
import { clearEvent, setEvent } from "../redux/event";
import { setActivity } from "../redux/activity";
import time24 from "../constants/time24";
const UserCalendar = () => {
  const userFromStore = useSelector((state) => state.user);
  const eventFromStore = useSelector((state) => state.event);
  const activityFromStore = useSelector((state) => state.activity);

  const [activitiesOrganized, setActivitiesOrganized] = useState(null);
  const [venuesOwned, setVenuesOwned] = useState(null);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [activitiesParticipated, setActivitiesParticipated] = useState(null);
  const handleDate = (val) => {};
  let venueTemp;

  useEffect(() => {
    if (activitiesParticipated === null) {
      let url = `${baseURL}/Registered_acts`;
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
          if ((res.status = "OK")) {
            setActivitiesParticipated(res.body);
          }
        })
        .then((res) => {
          url = `${baseURL}/venuelist`;
          requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
          fetch(url, requestOptions)
            .then((response) => response.json())
            .then((res) => {
              if (res.status === "OK") {
                res.body.forEach((val, index) => {
                  for (let [key, value] of Object.entries(val.venueSlots)) {
                    let valueArray = value.split(",");
                    valueArray = valueArray.map((val) => val.split("/"));

                    res.body[index].venueSlots[key] = valueArray;
                  }
                });
                dispatch(setEvent([...res.body]));
                setVenuesOwned(
                  eventFromStore.eventList.filter(
                    (val) => val.venueOwner == userFromStore.userName
                  )
                );
              } else alert("Unable to fetch event venues");
            });

          url = `${baseURL}/ra`;
          requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
          fetch(url, requestOptions)
            .then((response) => response.json())
            .then((res) => {
              if (res.status === "OK") {
                dispatch(setActivity([...res.body]));
                setActivitiesOrganized(
                  activityFromStore.activityList.filter(
                    (val) => val.activityOrganizer == userFromStore.userName
                  )
                );
              } else alert("Unable to fetch activities");
            });
        });
    }
  }, [activitiesParticipated, activitiesOrganized, venuesOwned]);

  return (
    <div>
      <br />
      <div
        className="mx-auto text-center pt-10 "
        style={{ width: "fit-content" }}
      >
        <div className="mx-auto">
          {" "}
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>
      <div className="d-flex">
        {userFromStore.isOwner === "false" ? (
          <>
            <div style={{ width: "33%" }} className="mx-auto">
              <div className="mx-auto mt-5 ">
                <div
                  className="card mx-auto mb-2 p-3 text-center"
                  style={{ minHeight: "300px" }}
                >
                  <h3 className="mx-auto mt-5" style={{ width: "fit-content" }}>
                    Activity Participation Calendar
                  </h3>
                  <br />

                  {activitiesParticipated !== null ? (
                    <table className="table mx-auto">
                      <tbody>
                        <tr>
                          <th>Activity Name</th>
                          <th>Time Duration</th>
                        </tr>
                        {activitiesParticipated != null &&
                          activitiesOrganized != null &&
                          venuesOwned != null &&
                          activityFromStore.activityList
                            .filter(
                              (val) =>
                                activitiesParticipated.includes(
                                  val.activityId
                                ) &&
                                val.activityDate ==
                                  `${date.getUTCFullYear()}-${
                                    date.getUTCMonth() + 1
                                  }-${date.getUTCDate()}`
                            )
                            .map((val, i) => (
                              <tr key={i}>
                                <td>{val.activityName}</td>
                                <td>
                                  {`${
                                    time24[
                                      Math.min.apply(Math, val.activityTime)
                                    ]
                                  }` +
                                    "-" +
                                    `${
                                      time24[
                                        Math.max.apply(Math, val.activityTime)
                                      ]
                                    }`}
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  ) : (
                    <h1> Loading</h1>
                  )}
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className="mx-auto">
              <div className="mx-auto mt-5 ">
                <div
                  className="card mx-auto mb-2 p-3 text-center"
                  style={{ minHeight: "300px" }}
                >
                  <div className="mx-auto">
                    <h3
                      className="mx-auto mt-5"
                      style={{ width: "fit-content" }}
                    >
                      Activity Organizer Calendar
                    </h3>
                  </div>
                  <br />

                  {activitiesParticipated !== null ? (
                    <table className="table mx-auto">
                      <tbody>
                        <tr>
                          <th>Activity Name</th>
                          <th>Time Duration</th>
                        </tr>
                        {activitiesParticipated != null &&
                          activitiesOrganized != null &&
                          venuesOwned != null &&
                          activitiesOrganized
                            .filter(
                              (val) =>
                                val.activityDate ==
                                `${date.getUTCFullYear()}-${
                                  date.getUTCMonth() + 1
                                }-${date.getUTCDate()}`
                            )
                            .map((val, i) => (
                              <tr key={i}>
                                <td>{val.activityName}</td>
                                <td>
                                  {`${
                                    time24[
                                      Math.min.apply(Math, val.activityTime)
                                    ]
                                  }` +
                                    "-" +
                                    `${
                                      time24[
                                        Math.max.apply(Math, val.activityTime)
                                      ]
                                    }`}
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  ) : (
                    <h1> Loading</h1>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ width: "33%" }} className="mx-auto">
            <div className="mx-auto mt-5 ">
              <div
                className="card mx-auto mb-2 p-3 text-center"
                style={{ minHeight: "300px" }}
              >
                <h3 className="mx-auto mt-5" style={{ width: "fit-content" }}>
                  Venue Owner Bookings
                </h3>
                <br />

                {activitiesParticipated != null &&
                activitiesOrganized != null &&
                venuesOwned != null &&
                activitiesOrganized ? (
                  <table className="table mx-auto">
                    <tbody>
                      <tr>
                        <th>Venue Name</th>
                        <th>Activity Name</th>
                        <th>Time</th>
                      </tr>
                      {activitiesParticipated != null &&
                        activitiesOrganized != null &&
                        true &&
                        venuesOwned !== null &&
                        venuesOwned.map((val) => {
                          return val.venueSlots?.[
                            `${date.getUTCFullYear()}-${
                              date.getUTCMonth() + 1
                            }-${date.getUTCDate()}`
                          ]?.map(([val1, val2], index) => {
                            if (val2 != "-1") {
                              return (
                                <tr>
                                  <td>{val.venueName}</td>
                                  <td>
                                    {activityFromStore.activityList
                                      .filter((val) => val.activityId == val2)
                                      .map((val) => val.activityName)}
                                  </td>
                                  <td>{time24[index]}</td>
                                </tr>
                              );
                            }
                          });
                        })}

                      <div>
                        {" "}
                        {[1, 2, 3].forEach((val) => {
                          return "adgdgdsfgdfgdfgf";
                        })}
                      </div>
                    </tbody>
                  </table>
                ) : (
                  <h1> Loading</h1>
                )}
                {}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCalendar;
