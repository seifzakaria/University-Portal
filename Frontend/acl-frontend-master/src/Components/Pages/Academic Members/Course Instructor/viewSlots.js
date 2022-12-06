import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Nav from "../../../NavBars/Nav";
// import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router'

export default function ViewSlots() {
  //const id = useSelector((state) => state.id)
  // const dispatch = useDispatch()
  // const history = useHistory()
  const [slots, setSlots] = useState("");
  const token = localStorage.getItem("user");

  useEffect(() => {
    // if (!dispatch(checkTokenExpired(history))) {
    axios({
      url: "http://localhost:8080/courseInstructor/viewSlotsAssignment",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        id: "ac4",
      },
    })
      .then((res) => {
        console.log(res);
        setSlots(res);
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.msg);
      });
    // }
  }, []);

  return (
    <div>
      <Nav />
      <div style={{ marginTop: "2vw", marginLeft: "1vw" }}>
        <Card
          style={{
            width: "28vw",
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
                Assigned Slots:
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
                {slots} [First, Second, Third, Fourth, Fifth]
              </text>
            </td>
          </tr>
        </Card>
      </div>
    </div>
  );
}
