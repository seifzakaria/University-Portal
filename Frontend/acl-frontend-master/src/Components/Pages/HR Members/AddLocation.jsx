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

const AddLocation = () => {
  const token = localStorage.getItem("user");
  const decoded = jwt_decoded(token);
  const [name, setname] = useState("");
  const [loc_type, settype] = useState("Lab");
  const [max_capacity, setMax] = useState("");
  const [current_capacity, setcurrent] = useState("");

  const handle_add = () => {
    axios
      .post(
        "http://localhost:8080/hrMember/AddLocation",
        {
          name: name,
          loc_type: loc_type,
          max_capacity: max_capacity,
          current_capacity: current_capacity,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        alert("New Location Has Been Added");
        console.log(response);
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
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              placeholder="C7-137"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />

            <Form.Text className="text-muted">
              Please Write The New room Number
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Current Number Of Student</Form.Label>
            <Form.Control
              value={current_capacity}
              onChange={(e) => {
                setcurrent(e.target.value);
              }}
              id="current_capacity"
            />
            <Form.Text className="text-muted">
              Enter The Current Number of people assigned to this New room ,
              Enter 0 if No one assigned to the Room
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Maximum Number Of Student</Form.Label>
            <Form.Control
              value={max_capacity}
              onChange={(e) => {
                setMax(e.target.value);
              }}
              id="max_capacity"
            />
            <Form.Text className="text-muted">
              Enter maximum number of people Can be presented inside the room
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Select Room Type</Form.Label>
            <Form.Control
              as="select"
              size="lg"
              value={loc_type}
              onChange={(e) => {
                settype(e.target.value);
              }}
              id="max_capacity"
            >
              <option>Lab</option>
              <option>Office</option>
              <option>Tutorial</option>
              <option>Hall</option>
            </Form.Control>
            <Form.Text className="text-muted">
              Select the room type you want to add
            </Form.Text>
          </Form.Group>
        </Form>
        <Button variant="danger" onClick={handle_add}>
          Add
        </Button>
      </Container>
    </div>
  );
};

export default AddLocation;
