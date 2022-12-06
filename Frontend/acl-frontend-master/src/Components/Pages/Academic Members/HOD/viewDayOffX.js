import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../../../NavBars/Nav";
export default function ViewDayOffX() {
  const [dayOffX, setDayOffX] = useState("");
  const token = localStorage.getItem("user");
  useEffect(() => {
    axios({
      url: "http://localhost:8080/headOfDepartment/viewDayOffX",
      method: "GET",
      headers: {
        token: token,
      },
      data: {
        staff_id: "ac-5",
      },
    })
      .then((res) => {
        console.log(res);
        setDayOffX(res);
      })
      .catch((error) => {
        console.log(error.msg);
      });
  }, []);

  return (
    <div>
      <Nav />
      <text
        style={{
          marginTop: "3vw",
          marginLeft: "1vw",
          fontWeight: "bold",
          fontSize: "1vw",
        }}
      >
        Day Off:
      </text>
      <text
        style={{
          marginTop: "3vw",
          marginLeft: "0.1vw",
          fontSize: "1vw",
          color: "red",
        }}
      >
        {dayOffX} Tuesday
      </text>
    </div>
  );
}
