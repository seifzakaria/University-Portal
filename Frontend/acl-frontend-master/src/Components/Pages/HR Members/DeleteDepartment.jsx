import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decoded from "jwt-decode";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
const DeleteFaculty = () => {
  const [name, setname] = useState("");

  const handle_delete = () => {
    const token = localStorage.getItem("user");
    const decoded = jwt_decoded(token);
    axios
      .post(
        "http://localhost:8080/hrMember/DeleteDepartment",
        {
          name: name,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        console.log(response);
        alert("The Department Has Been Deleted");
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };
  return (
    <div>
      <Nav />
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              placeholder="@Met"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter the department name you want to delete
            </Form.Text>
          </Form.Group>
        </Form>
        <Button
          class="d-flex justify-content-center"
          variant="danger"
          onClick={handle_delete}
        >
          Delete
        </Button>
      </Container>
    </div>
  );
};

export default DeleteFaculty;
