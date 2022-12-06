import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "../../../NavBars/Nav";

export default function SendReplacementReq() {
  const token = localStorage.getItem("user");
  const [receiverId, setReceiverId] = useState("");
  const [dateToBeRequested, setDateToBeRequested] = useState("");
  const [slotId, setSlotId] = useState("");
  const [validated, setValidated] = useState(false);

  const handleReceiverId = (e) => {
    setReceiverId(e.target.value);
  };
  const handledateToBeRequested = (e) => {
    setDateToBeRequested(e.target.value);
  };
  const handleSlotId = (e) => {
    setSlotId(e.target.value);
  };

  const handleSubmit = (event) => {
    if ((receiverId === "", dateToBeRequested === "", slotId === "")) {
      alert("one of the inputs is missing");
    }
    axios({
      url: "http://localhost:8080/academicMember/replacementReq",
      method: "GET",
      headers: {
        token: token,
      },
      data: {
        receiver_id: receiverId,
        date_to_be_requested: dateToBeRequested,
        slot_id: slotId,
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
          Replacement Request
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
                  Receiver Id:
                </Form.Label>
              </td>
              &nbsp;
              <td>
                <Form.Control
                  style={{ marginBottom: "1vw" }}
                  value={receiverId}
                  onChange={handleReceiverId}
                  required
                ></Form.Control>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label style={{ marginBottom: "1vw" }}>
                  Date To Be Requested:
                </Form.Label>
              </td>
              &nbsp;
              <td>
                <Form.Control
                  style={{ marginBottom: "1vw" }}
                  value={dateToBeRequested}
                  onChange={handledateToBeRequested}
                  required
                ></Form.Control>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label style={{ marginBottom: "1vw" }}>
                  Slot Id:
                </Form.Label>
              </td>
              &nbsp;
              <td>
                <Form.Control
                  style={{ marginBottom: "1vw" }}
                  value={dateToBeRequested}
                  onChange={handleSlotId}
                  required
                ></Form.Control>
              </td>
            </tr>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ marginLeft: "19vw" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
