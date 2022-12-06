import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useHistory } from "react-router";
import Nav from "../../../NavBars/Nav";

export default function ViewReplacementReq() {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("");
  const [senderId, setSenderId] = useState("");
  const [slotId, setSlotId] = useState("");
  const [type, setType] = useState("");
  const [dateToBeReq, setDateToBeReq] = useState("");

  const history = useHistory();
  const requests1 = [
    [
      "status : Pending",
      "_id : 5fe5e4c0750d936ee4b3e4c1",
      "type : replacement",
      "sender_id : 204030303de4",
      "receiver_id : 5fe5e4c0750d936ee4b3e4c1",
    ][
      ("status : Pending",
      "_id : 5fe5e4c0750d936ee4b3e4c1",
      "type : replacement",
      "sender_id : 204030303de4",
      "receiver_id : 5fe5e4c0750d936ee4b3e4c1")
    ],
    [
      "status : Pending",
      "_id : 5fe5e4c0750d936ee4b3e4c1",
      "type : replacement",
      "sender_id : 204030303de4",
      "receiver_id : 5fe5e4c0750d936ee4b3e4c1",
    ],
  ];
  const token = localStorage.getItem("user");
  useEffect(() => {
    axios({
      url: "http://localhost:8080/academicMember/viewReplacementReq",
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((res) => {
        console.log(res);
        setRequests(res.data);
        //setDateToBeReq(res.data.date_to_be_requested),
        //setSenderId(res.data.sender_id) ,
        // setStatus(res.data.status),
        //
        // setType(res.data.type),
        //
        // setSlotId(res.data.slot_id)
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
          All Replacements Requests
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
                        height: "9vw",
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
                            status:{" "}
                          </text>
                        </td>
                        <td>
                          <text
                            style={{
                              marginLeft: "2vw",
                              fontWeight: "bold",
                              fontSize: "1vw",
                              color: "red",
                            }}
                          >
                            {" "}
                            {requests.status}{" "}
                          </text>
                        </td>
                      </tr>
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
                            sender id:{" "}
                          </text>
                        </td>
                        <td>
                          <text
                            style={{
                              marginLeft: "2vw",
                              fontWeight: "bold",
                              fontSize: "1vw",
                              color: "red",
                            }}
                          >
                            {" "}
                            {requests1.sender_id}{" "}
                          </text>
                        </td>
                      </tr>
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
                            type:{" "}
                          </text>
                        </td>
                        <td>
                          <text
                            style={{
                              marginLeft: "2vw",
                              fontWeight: "bold",
                              fontSize: "1vw",
                              color: "red",
                            }}
                          >
                            {" "}
                            {requests1.type}{" "}
                          </text>
                        </td>
                      </tr>
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
                            date to be requested:
                          </text>
                        </td>
                        <td>
                          <text
                            style={{
                              marginLeft: "2vw",
                              fontWeight: "bold",
                              fontSize: "1vw",
                              color: "red",
                            }}
                          >
                            {" "}
                            {requests1.date_to_be_requested}{" "}
                          </text>
                        </td>
                      </tr>
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
                            slot id:
                          </text>
                        </td>
                        <td>
                          <text
                            style={{
                              marginLeft: "2vw",
                              fontWeight: "bold",
                              fontSize: "1vw",
                              color: "red",
                            }}
                          >
                            {" "}
                            {requests.slot_id}{" "}
                          </text>
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
