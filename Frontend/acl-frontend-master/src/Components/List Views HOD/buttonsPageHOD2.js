import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewDayOffX from "../Pages/Academic Members/HOD/viewDayOffX";
import Nav from "../NavBars/Nav";

export default function ButtonsPageHod2() {
  const token = localStorage.getItem("user");

  const assignInst = () => {
    axios({
      url: "http://localhost:8080/headOfDepartment/assignInst",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        id: "5fdfddd624f5837ddbccc5c3",
        course_name: "bio",
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

  const unassignInst = () => {
    axios({
      url: "http://localhost:8080/headOfDepartment/unassignInst",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        id: "5fdfddd624f5837ddbccc5c3",
        course_name: "bio",
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

  const reassignInst = () => {
    axios({
      url: "http://localhost:8080/headOfDepartment/reassignInst",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        id: "5fdfddd624f5837ddbccc5c3",
        course_name_remove: "bio",
        course_name_add: "mecha",
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
      <div style={{ marginTop: "3vw" }}>
        <div>
          <ViewDayOffX />
        </div>
        <div style={{ marginTop: "1vw", marginLeft: "54vw" }}>
          <button
            style={{ backgroundColor: "black", border: "none", color: "white" }}
            onClick={assignInst}
          >
            Assign
          </button>
        </div>

        <div style={{ marginTop: "1vw", marginLeft: "52vw" }}>
          <button
            style={{ backgroundColor: "black", border: "none", color: "white" }}
            onClick={unassignInst}
          >
            Delete
          </button>
          &nbsp;
          <button
            style={{ backgroundColor: "black", border: "none", color: "white" }}
            onClick={reassignInst}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
