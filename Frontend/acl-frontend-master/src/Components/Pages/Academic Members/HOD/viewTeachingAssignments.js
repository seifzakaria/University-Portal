import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Nav from "../../../NavBars/Nav";

export default function ViewTeachingAssigments() {
  const [teachingAssignments, setTeachingAssignments] = useState("");
  const teachingAssignments1 = [
    ["ac-4", "[1st, 2nd, 5th]"],
    ["ac-4", "[1st, 2nd, 5th]"],
    ["ac-4", "[1st, 2nd, 5th]"],
    ["ac-4", "[1st, 2nd, 5th]"],
  ];
  const token = localStorage.getItem("user");
  useEffect(() => {
    axios({
      url: "http://localhost:8080/headOfDepartment/viewAssignments",
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((response) => {
        console.log(response);
        setTeachingAssignments(response.data);
      })
      .catch((error) => {
        console.log(error.msg);
      });
  }, []);

  return (
    <div>
      <Nav />
      <div style={{ marginTop: "2vw" }}>
        <h
          style={{ fontWeight: "bold", marginLeft: "40vw", fontSize: "1.5vw" }}
        >
          Teaching Assignments
        </h>
        <div style={{ marginTop: "2vw" }}>
          {teachingAssignments1.map((element, index) => {
            return (
              <div>
                <Card
                  style={{
                    width: "50vw",
                    height: "3vw",
                    borderWidth: "0.2vw",
                    borderColor: "#a9a9a9",
                    marginLeft: "1vw",
                    marginBottom: "1vw",
                  }}
                >
                  <table>
                    <tr>
                      <td>
                        <text
                          style={{
                            marginTop: "3vw",
                            marginLeft: "1vw",
                            fontWeight: "bold",
                            fontSize: "1vw",
                          }}
                        >
                          Staff Member:
                        </text>
                        <text
                          style={{
                            marginTop: "3vw",
                            marginLeft: "0.7vw",
                            fontSize: "1vw",
                            fontColor: "red",
                          }}
                        >
                          {teachingAssignments1[index]}
                        </text>
                      </td>

                      <td>
                        <text
                          style={{
                            marginLeft: "1vw",
                            fontWeight: "bold",
                            fontSize: "1vw",
                          }}
                        >
                          Assigned Slots :
                        </text>
                        <text
                          style={{
                            marginTop: "3vw",
                            marginLeft: "0.7vw",
                            fontSize: "1vw",
                            fontColor: "red",
                          }}
                        >
                          {teachingAssignments1[index]}
                        </text>
                      </td>
                    </tr>
                  </table>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
