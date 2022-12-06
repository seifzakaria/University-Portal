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
  const token = localStorage.getItem("user");
  const decoded = jwt_decoded(token);
  const handle_Delete = () => {
    axios
      .post(
        "http://localhost:8080/hrMember/DeleteFaculty",
        {
          name: name,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        console.log(response);
        alert("The Faculty Has Been Deleted");
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
            <Form.Label>Faculty Name</Form.Label>
            <Form.Control
              placeholder="@Engineering"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Please write the faculty name you want to delete
            </Form.Text>
          </Form.Group>
        </Form>

        <Button variant="danger" onClick={handle_Delete}>
          Delete
        </Button>
      </Container>
    </div>
  );
};

export default DeleteFaculty;
