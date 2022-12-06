import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decoded from "jwt-decode";

import {
  Button,
  Alert,
  Form,
  Container,
  Dropdown,
  StyleSheet,
  ButtonGroup,
} from "react-bootstrap";
import Nav from "../../NavBars/Nav";

const axios = require("axios").default;

const Delte_User = () => {
  const [id, setid] = useState("");
  const token = localStorage.getItem("user");
  const decoded = jwt_decoded(token);

  const handle_delete = () => {
    axios
      .post(
        "http://localhost:8080/hrMember/DeleteUser",
        {
          id: id,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("The User Has Been Deleted");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        alert(error.response.data.error);
      });
  };

  return (
    <div>
      <Nav />
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>User ID</Form.Label>

            <Form.Control
              placeholder="@hr-4 or @ac-4"
              value={id}
              onChange={(e) => {
                setid(e.target.value);
              }}
            />

            <Form.Text className="text-muted">
              Enter The User ID You Want TO Delete
            </Form.Text>
          </Form.Group>
        </Form>

        <Button variant="danger" onClick={handle_delete}>
          Delete
        </Button>
      </Container>
    </div>
  );
};
export default Delte_User;
