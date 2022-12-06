import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "../../../../NavBars/Nav";

export default function CompensationLeave() {
  const token = localStorage.getItem("user");
  const [dayAbsent, setDayAbsent] = useState("");
  const [dayComp, setDayComp] = useState("");
  const [reason, setReason] = useState("");
  const [validated, setValidated] = useState(false);

  const handleDayAbsent = (e) => {
    setDayAbsent(e.target.value);
  };
  const handleDayComp = (e) => {
    setDayComp(e.target.value);
  };
  const handleReason = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = (event) => {
    if (dayAbsent === "" || reason === "" || dayComp === "") {
      alert("One of the inputs is missing");
    }
    axios({
      url: "http://localhost:8080/academicMember/compLeaveReq",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        dayAbsent: dayAbsent,
        dayComp: dayComp,
        reason: reason,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Nav />
      <div style={{ marginTop: "2vw" }}>
        <h style={{ marginLeft: "1vw", fontSize: "1.5vw", fontWeight: "bold" }}>
          Compensation Leave
        </h>
        <Form
          style={{ marginLeft: "1vw", marginTop: "2vw" }}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group>
            <tr>
              <td>
                <Form.Label style={{ marginBottom: "1vw" }}>
                  Day Absent:
                </Form.Label>
              </td>
              &nbsp;
              <td>
                <Form.Control
                  style={{ marginBottom: "1vw" }}
                  value={dayAbsent}
                  onChange={handleDayAbsent}
                  required
                ></Form.Control>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label style={{ marginBottom: "1vw" }}>
                  Day Compensated:
                </Form.Label>
              </td>
              &nbsp;
              <td>
                <Form.Control
                  style={{ marginBottom: "1vw" }}
                  value={dayComp}
                  onChange={handleDayComp}
                  required
                ></Form.Control>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label style={{ marginBottom: "1vw" }}>Reason:</Form.Label>
              </td>
              &nbsp;
              <td>
                <Form.Control
                  style={{ marginBottom: "1vw" }}
                  value={reason}
                  onChange={handleReason}
                  required
                ></Form.Control>
              </td>
            </tr>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ marginLeft: "17vw" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
