import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "../../../NavBars/Nav";

export default function SlotLinkingReq() {
  const token = localStorage.getItem("user");

  const [dateToBeRequested, setDateToBeRequested] = useState("");
  const [slotId, setSlotId] = useState("");
  const [validated, setValidated] = useState(false);

  const handledateToBeRequested = (e) => {
    setDateToBeRequested(e.target.value);
  };
  const handleSlotId = (e) => {
    setSlotId(e.target.value);
  };

  const handleSubmit = (event) => {
    if ((dateToBeRequested === "", slotId === "")) {
      alert("one of the inputs is missing");
    }
    axios({
      url: "http//localhost:8080/academicMember/slotLinkingReq",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        dateReq: dateToBeRequested,
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
        <text
          style={{
            marginLeft: "1vw",
            fontSize: "1.5vw",
            fontWeight: "bold",
            marginTop: "2vw",
          }}
        >
          Slot Linking Request
        </text>

        <Form
          style={{ marginLeft: "1vw", marginTop: "2vw" }}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <table>
            <Form.Group>
              <tr>
                <td>
                  <Form.Label style={{ marginBottom: "1vw" }}>
                    Date Requested:
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
                    value={slotId}
                    onChange={handleSlotId}
                    required
                  ></Form.Control>
                </td>
              </tr>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ marginLeft: "16vw" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </table>
        </Form>
      </div>
    </div>
  );
}
