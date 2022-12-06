import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "../../../../NavBars/Nav";

export default function MaternityLeave() {
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
      url: "http://localhost:8080/academicMember/maternityLeaveReq ",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        AbsentDate: dateAbsent,
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
          Maternity Leave
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
                  Date Absent:
                </Form.Label>
              </td>
              &nbsp;
              <td>
                <Form.Control
                  style={{ marginBottom: "1vw" }}
                  value={dateAbsent}
                  onChange={handleDateAbsent}
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
