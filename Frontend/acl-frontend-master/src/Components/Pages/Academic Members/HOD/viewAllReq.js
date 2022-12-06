import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useHistory } from "react-router";
import Nav from "../../../NavBars/Nav";

export default function ViewAllReq() {
  const [requests, setRequests] = useState([]);
  const history = useHistory();
  const requests1 = ["Sick Leave", "Maternity Leave"];
  const token = localStorage.getItem("user");
  const nav = () => {
    history.push("/acceptReject");
  };
  useEffect(() => {
    axios({
      url: "http://localhost:8080/headOfDepartment/viewRequests",
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
        setRequests(res.data);
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
          Requests
        </h>

        <div
          style={{
            fontSize: "1vw",
            marginTop: "3vw",
            marginLeft: "1vw",
            marginBottom: "3vw",
          }}
        >
          {requests.map((element, index) => {
            return (
              <table style={{ marginTop: "1vw" }}>
                <tr>
                  <td>
                    <button
                      onClick={nav}
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
                              {requests[index]}{" "}
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
          To Accept/Reject a request, please click on the request.
        </text>
      </div>
    </div>
  );
}
