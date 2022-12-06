import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useHistory } from "react-router";
import Nav from "../../../../NavBars/Nav";

export default function ViewAll() {
  const [requests, setRequests] = useState("");
  const history = useHistory();
  const requests1 = [
    ["status : pending", "id: abcdefgh"],
    ["status : accepted", "id: abcdefklh"],
    ["status : pending", "id: abcdefggdsah"],
  ];
  const token = localStorage.getItem("user");
  useEffect(() => {
    axios({
      url: "http://localhost:8080/academicMember/viewReqStatus",
      method: "GET",
      headers: {
        token: token,
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
      dummy data
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
          {requests1.map((element, index) => {
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
                            {index + 1}{" "}
                          </text>
                        </td>
                        <td>
                          {" "}
                          &nbsp; &nbsp; &nbsp;
                          <text style={{ fontSize: "1vw", color: "#8b0000 " }}>
                            {" "}
                            {requests1[index]}{" "}
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
