import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../../../NavBars/Nav";

export default function AcceptRejectReq() {
  const token = localStorage.getItem("user");

  const acceptReq = () => {
    axios({
      url: "http://localhost:8080/headOfDepartment/acceptRequest ",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        request_id: "5fe4e14fdb423168510f93d6",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectReq = () => {
    axios({
      url: "http://localhost:8080/headOfDepartment/rejectRequest",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        id: "5fe5e4c0750d936ee4b3e4c1",
        reject_reason: "because",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Nav />
      <div style={{ marginTop: "5vw", marginLeft: "52vw" }}>
        <button
          style={{ backgroundColor: "black", border: "none", color: "white" }}
          onClick={acceptReq}
        >
          Accept
        </button>
        &nbsp;
        <button
          style={{ backgroundColor: "black", border: "none", color: "white" }}
          onClick={rejectReq}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
