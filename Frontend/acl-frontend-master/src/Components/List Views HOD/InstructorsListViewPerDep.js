import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useHistory } from "react-router";
import Nav from "../NavBars/Nav";

export default function InstructorsListViewPerDep() {
  const [instructors, setInstructors] = useState("");
  const instructors1 = ["Mai", "Sara"];
  const history = useHistory();
  const token = localStorage.getItem("user");
  useEffect(() => {
    axios({
      url: "http://localhost:8080/headOfDepartment/viewStaffAll",
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((res) => {
        console.log(res);
        setInstructors(res.data);
        console.log(instructors)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const theOnClick = () => {
    history.push("/buttonsPageHOD2");
  };

  return (
    <div>
      <Nav />
      <div style={{ marginTop: "2vw" }}>
        <h
          style={{ fontWeight: "bold", marginLeft: "40vw", fontSize: "1.5vw" }}
        >
          Instructors in this department
        </h>

        <div
          style={{
            fontSize: "1vw",
            marginTop: "3vw",
            marginLeft: "1vw",
            marginBottom: "3vw",
          }}
        >
          {console.log(instructors)}
          {instructors.map((element, index) => {
            return (
              <table style={{ marginTop: "1vw" }}>
                <tr>
                  <td>
                    <button
                      onClick={theOnClick}
                      style={{ border: "black", backgroundColor: "white" }}
                    >
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
                              {index + 1}{" "}
                            </text>
                          </td>
                          <td>
                            {" "}
                            &nbsp; &nbsp; &nbsp;
                            <text
                              style={{ fontSize: "1vw", color: "#8b0000 " }}
                            >
                              {" "}
                              {instructors[index]}{" "}
                            </text>{" "}
                          </td>
                        </tr>
                      </Card>
                    </button>
                  </td>
                </tr>
              </table>
            );
          })}
        </div>
        <text
          style={{ marginLeft: "1.5vw", fontWeight: "bold", color: "#8b0000" }}
        >
          Note:
        </text>
        <text style={{ marginLeft: "0.5vw", fontWeight: "bold" }}>
          To Assign/Unassign an instructor or view their day off, please click
          on the instructor.
        </text>
      </div>
    </div>
  );
}
