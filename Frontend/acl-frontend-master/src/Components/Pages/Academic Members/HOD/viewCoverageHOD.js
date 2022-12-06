import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Nav from "../../../NavBars/Nav";
//import { useDispatch, useSelector } from 'react-redux'
//import { useHistory } from 'react-router'

export default function ViewCoverageHOD(props) {
  //const id = useSelector((state) => state.id)
  //const dispatch = useDispatch()
  //const history = useHistory()
  const token = localStorage.getItem("user");
  const [coverage, setCoverage] = useState("");

  useEffect(() => {
    axios({
      url: "http://localhost:8080/headOfDepartment/viewCoverage",
      method: "GET",
      headers: {
        token: token,
      },
      data: {
        course_name: props.courseName,
      },
    })
      .then((res) => {
        console.log(res);
        setCoverage(res);
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Nav />
      <Card
        style={{
          width: "13vw",
          height: "3vw",
          borderWidth: "0.2vw",
          borderColor: "#a9a9a9",
        }}
      >
        <tr>
          <td>
            <text
              style={{
                marginTop: "3vw",
                marginLeft: "1vw",
                fontWeight: "bold",
                fontSize: "1vw",
              }}
            >
              Course Coverage:
            </text>
          </td>
          <td>
            <text
              style={{
                marginTop: "3vw",
                marginLeft: "0.7vw",
                fontSize: "1vw",
                fontColor: "red",
              }}
            >
              {coverage}
            </text>
          </td>
        </tr>
      </Card>
    </div>
  );
}
