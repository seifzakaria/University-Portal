import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import Nav from "../../../NavBars/Nav";

export default function CoursesCI() {
  const token = localStorage.getItem("user");
  const [courses, setCourses] = useState("");
  const course1 = ["Computer Science", "Physics", "Mechanics"];
  const history = useHistory();
  useEffect(() => {
    axios({
      url: "http://localhost:8080/courseInstructor/viewInst",
      method: "POST",
      headers: {
        token: token,
      },
    })
      .then((res) => {
        console.log(res);
        setCourses(res.data.courses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const theOnClick = () => {
    history.push("/login/CI/viewCoverage");
  };

  return (
    <div>
      <Nav />
      <div style={{ marginTop: "2vw" }}>
        <h
          style={{ fontWeight: "bold", marginLeft: "40vw", fontSize: "1.5vw" }}
        >
          Courses You're Assigned To
        </h>

        <div
          style={{
            fontSize: "1vw",
            marginTop: "3vw",
            marginLeft: "1vw",
            marginBottom: "3vw",
          }}
        >
          {course1.map((element, index) => {
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
                              {courses[index]}{" "}
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
          To view the course coverage for each course, please click on the
          course.
        </text>
      </div>
    </div>
  );
}
