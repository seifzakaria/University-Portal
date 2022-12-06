import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import Checkbox from "@material-ui/core/Checkbox";
import Nav from "../../../NavBars/Nav";

export default function ViewAllStaff(props) {
  const token = localStorage.getItem("user");
  const history = useHistory();
  const [instructors, setInstructors] = useState("");
  const instructors1 = ["Salma", "Mai", "Sara"];

  useEffect(() => {
    axios({
      url: "http://localhost:8080/courseInstructor/viewAllStaff",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        course_name: "csen701",
      },
    })
      .then((res) => {
        console.log(res);
        setInstructors(res);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const cardClick = () => {
    history.push("/login/CI/buttonsPage");
  };

  return (
    <div>
      <Nav />
      <div style={{ marginTop: "2vw" }}>
        <h
          style={{ fontWeight: "bold", marginLeft: "40vw", fontSize: "1.5vw" }}
        >
          Instructors
        </h>

        <div
          style={{
            fontSize: "1vw",
            marginTop: "3vw",
            marginLeft: "1vw",
            marginBottom: "3vw",
          }}
        >
          {instructors1.map((element, index) => {
            return (
              <table style={{ marginTop: "1vw" }}>
                <tr>
                  <td>
                    <button
                      onClick={cardClick}
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
                              {instructors1[index]}{" "}
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
          For instructor functionalities, please click on the instructor.
        </text>
      </div>
    </div>
  );
}
