import React, { useState, useEffect } from "react";
import Nav from "../NavBars/Nav";
//import {  useSelector } from 'react-redux'

export default function ButtonsPageHod() {
  const axios = require("axios").default;
  const token = localStorage.getItem("user");
  // const token = useSelector((state) => state.token)

  const assignInst = () => {
    axios({
      url: "http://localhost:8080/headOfDepartment/assignInst",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        id: "ac-5",
        course_name: "bio",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.msg);
      });
  };
  //   const assignInst = () =>{
  //     axios.post(
  //     "http://localhost:8080/headOfDepartment/assignInst",
  //     {
  //       id: "ac-5",
  //       course_name:"bio"
  //     },
  //     { headers: { token: token } }
  //   )
  //   .then((res) => {
  //     alert(res.data.message);
  //     // if (res.data.error) {
  //     //   alert(res.data.error);
  //     // } else {
  //     //   alert(res.data.msg);
  //     // }
  //   })
  //   .catch((error) => {
  //     alert(error.response.data.details[0].message);
  //     console.log(error.response);
  //   });
  // }
  // const unassignInst = () =>{
  //   axios({
  //     url: 'http://localhost:8080/headOfDepartment/unassignInst',
  //     method: 'POST',
  //     headers: {
  //       token: token,
  //     },
  //     data: {
  //       id: "ac4",
  //
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res)
  //       if (res.data.error) {
  //         alert(res.data.error);
  //       } else {
  //         alert(res.data.msg);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.msg)

  //     })
  // }
  const unassignInst = (id) => {
    console.log(id);
    axios
      .post("http://localhost:8080/headOfDepartment/unassignInst", {
        headers: { token: token },
        data: { id: "ac-5" },
      })
      .then((res) => {
        console.log(res);
        if (res.data.msg) {
          alert(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.response);
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
        id: "ac-5",
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
        console.log(error.msg);
      });
  };

  return (
    <div>
      <Nav />
      <div style={{ marginTop: "3vw" }}>
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
