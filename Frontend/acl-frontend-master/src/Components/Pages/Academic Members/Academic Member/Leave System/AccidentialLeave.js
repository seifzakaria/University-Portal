import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "../../../../NavBars/Nav";

export default function AccidentialLeave() {
  const token = localStorage.getItem("user");
  const [dateAbsent, setDateAbsent] = useState("");
  const [reason, setReason] = useState("");
  const [validated, setValidated] = useState(false);

  const handleDateAbsent = (e) => {
    setDateAbsent(e.target.value);
  };
  const handleReason = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = (event) => {
    if (dateAbsent === "" || reason === "") {
      alert("One of the inputs is missing");
    }
    axios({
      url: "http://localhost:8080/academicMember/acciLeaveReq ",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        absentDate: dateAbsent,
        reason: reason,
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
      <div style={{ marginTop: "2vw" }}>
        <h style={{ marginLeft: "1vw", fontSize: "1.5vw", fontWeight: "bold" }}>
          Accidential Leave
        </h>
        <Form
          style={{ marginLeft: "1vw", marginTop: "2vw" }}
          onSubmit={handleSubmit}
        >
          <Form.Group>
            <tr>
              <td>
                <Form.Label style={{ marginBottom: "1vw" }}>
                  Date Absent:
                </Form.Label>
              </td>
              &nbsp;
              <td>
                <Form.Control
                  style={{ marginBottom: "1vw" }}
                  value={dateAbsent}
                  onChange={handleDateAbsent}
                ></Form.Control>
                <Form.Control.Feedback>
                  This field is required
                </Form.Control.Feedback>
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
                ></Form.Control>
              </td>
            </tr>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ marginLeft: "14vw" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
