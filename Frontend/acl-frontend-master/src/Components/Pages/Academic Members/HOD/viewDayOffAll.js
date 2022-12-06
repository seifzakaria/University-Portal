import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Nav from "../../../NavBars/Nav";
export default function ViewDayOffAll() {
  const [dayOffAll, setDayOffAll] = useState([]);
  const dayOffAll1 = [
    [" ac-2 ", "  Sunday"],

    [" ac-5 ", "  Tuesday"],

    [" ac-3 ", "  Sunday"],
    [" bc-2 ", "  Thursday"],
    [" a4-2 ", "  Thursday"],
    [" ah-2 ", "  Sunday"],
  ];
  const token = localStorage.getItem("user");
  useEffect(() => {
    axios({
      url: "http://localhost:8080/headOfDepartment/viewDayOffAll",
      method: "GET",
      headers: {
        token: token,
      },
      data: {
        id: "ac-5",
      },
    })
      .then((res) => {
        console.log(res);
        setDayOffAll(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Nav />
      <div style={{ marginTop: "2vw" }}>
        <h
          style={{ fontWeight: "bold", marginLeft: "40vw", fontSize: "1.5vw" }}
        >
          All Instructors Day Off
        </h>

        <div
          style={{
            fontSize: "1vw",
            marginTop: "3vw",
            marginLeft: "1vw",
            marginBottom: "3vw",
          }}
        >
          {dayOffAll.map((element, index) => {
            return (
              <table style={{ marginTop: "1vw" }}>
                <tr>
                  <td>
                    <Card
                      style={{
                        width: "50vw",
                        height: "3vw",
                        borderWidth: "0.2vw",
                        borderColor: "#a9a9a9",
                      }}
                    >
                      <tr>
                        <td>
                          <text
                            style={{
                              marginLeft: "2vw",
                              fontWeight: "bold",
                              fontSize: "1vw",
                            }}
                          >
                            {" "}
                            ID: {dayOffAll.id}{" "}
                          </text>
                        </td>
                        <td>
                          {" "}
                          &nbsp; &nbsp; &nbsp;
                          <text
                            style={{
                              fontSize: "1vw",
                              fontWeight: "bold",
                              marginLeft: "18vw",
                            }}
                          >
                            {" "}
                            Day: {dayOffAll.day}{" "}
                          </text>{" "}
                        </td>
                      </tr>
                    </Card>
                  </td>
                </tr>
              </table>
            );
          })}
        </div>
      </div>
    </div>
  );
}
