import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decoded from "jwt-decode";

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

const UpdateFaculty = () => {
  const [name, setname] = useState("");
  const [newname, setnew] = useState("");
  const token = localStorage.getItem("user");
  const decoded = jwt_decoded(token);
  const handle_update = () => {
    axios
      .post(
        "http://localhost:8080/hrMember/updatefaculty",
        {
          name: name,
          newname: newname,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        console.log(response);
        alert("Updated Successfully");
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
              Enter Faculty Name You Want To Update
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>New Faculty Name</Form.Label>
            <Form.Control
              placeholder="@Business"
              value={newname}
              onChange={(e) => {
                setnew(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter The New Faculty Name
            </Form.Text>
          </Form.Group>
        </Form>
        <Button variant="danger" onClick={handle_update}>
          Update
        </Button>
      </Container>
    </div>
  );
};
export default UpdateFaculty;
