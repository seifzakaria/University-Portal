import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useHistory } from "react-router";
import ViewCoverageHOD from "../Pages/Academic Members/HOD/viewCoverageHOD";
import Nav from "../NavBars/Nav";

export default function InstructorsListViewPerCourse() {
  const [instructors, setInstructors] = useState("");
  const instructors1 = ["Heidi", "Sara", "John"];
  const history = useHistory();
  const token = localStorage.getItem("user");
  const nav = () => {
    history.push("/buttonsPageHod");
  };
  const viewCoverage = () => {
    history.push("/viewCoverageHOD");
  };
  useEffect(() => {
    axios({
      url: "http://localhost:8080/headOfDepartment/viewStaffCourse",
      method: "GET",
      headers: {
        token: token,
      },
      data: {
        course_name: "bio",
      },
    })
      .then((res) => {
        console.log(res.data);
        setInstructors(res.data);
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.msg);
      });
  });

  return (
    <div>
      <Nav />
      <div style={{ marginTop: "2vw" }}>
        <h
          style={{ fontWeight: "bold", marginLeft: "40vw", fontSize: "1.5vw" }}
        >
          Instructors
        </h>
        <div style={{ marginLeft: "80vw", marginTop: "3vw" }}>
          {/* <button style={{ backgroundColor:'#a9a9a9',borderColor:'#a9a9a9', height:'2vw',color:'white',fontWeight:'bold'}}
      onClick={viewCoverage}>
         View Course Coverage
    </button>*/}
          <div>
            <ViewCoverageHOD courseName="bio" />
          </div>
        </div>
        <div style={{ marginBottom: "3vw", marginLeft: "1vw" }}>
          {instructors1.map((element, index) => {
            return (
              <table style={{ marginTop: "1vw" }}>
                <tr>
                  <td>
                    <button
                      style={{ border: "black", backgroundColor: "white" }}
                      onClick={nav}
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
                            <text style={{ marginLeft: "1vw" }}>
                              {index + 1}
                            </text>
                          </td>
                          <td> &nbsp; &nbsp; &nbsp;{instructors1[index]}</td>
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
          To Assign/Unassign an instructor, please click on the instructor.
        </text>
      </div>
    </div>
  );
}
