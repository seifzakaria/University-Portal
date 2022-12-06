import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useHistory } from "react-router";
import Nav from "../../../NavBars/Nav";

export default function ViewSchedule() {
  const [schedule, setSchedule] = useState([]);
  const history = useHistory();

  const token = localStorage.getItem("user");
  useEffect(() => {
    axios({
      url: "http://localhost:8080/academicMember/viewSchedule",
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((res) => {
        console.log(res);
        setSchedule(res.data.Schedule);
        if (res.data.error) alert(res.data.error);
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
          Schedule
        </h>

        <div
          style={{
            fontSize: "1vw",
            marginTop: "3vw",
            marginLeft: "1vw",
            marginBottom: "3vw",
          }}
        >
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
                        {schedule}
                      </text>
                    </td>
                  </tr>
                </Card>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
