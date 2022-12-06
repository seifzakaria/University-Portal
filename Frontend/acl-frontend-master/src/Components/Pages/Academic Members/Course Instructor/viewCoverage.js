import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Nav from "../../../NavBars/Nav";
//import { useDispatch, useSelector } from 'react-redux'
//import { useHistory } from 'react-router'

export default function ViewCoverage() {
  //const id = useSelector((state) => state.id)
  //const dispatch = useDispatch()
  //const history = useHistory()
  const token = localStorage.getItem("user");
  const [coverage, setCoverage] = useState("");

  useEffect(() => {
    axios({
      url: "http://localhost:8080/courseInstructor/viewCourseCoverage",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        academicMemberID: "ac-5",
        status: "assigned",
      },
    })
      .then((res) => {
        console.log(res);
        setCoverage(res);
      })
      .catch((error) => {
        console.log(error.msg);
      });
  }, []);

  return (
    <div>
      <Nav />
      <div style={{ marginTop: "2vw", marginLeft: "1vw" }}>
        <Card
          style={{
            width: "15vw",
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
                  fontWeight: "bold",
                  fontSize: "1vw",
                  color: "red",
                }}
              >
                {/*coverage*/} 2.7
              </text>
            </td>
          </tr>
        </Card>
      </div>
    </div>
  );
}
