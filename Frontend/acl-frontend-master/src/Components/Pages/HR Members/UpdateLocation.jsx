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
  Nav,
} from "react-bootstrap";

const axios = require("axios").default;

const UpdateLocation = () => {
  const [name, setname] = useState("");
  const [newname, setnew] = useState("");
  const [loc_type, settype] = useState("");
  const token = localStorage.getItem("user");
  const decoded = jwt_decoded(token);
  const handle_update = () => {
    axios
      .post(
        "http://localhost:8080/hrMember/updatelocation",
        {
          name: name,
          newname: newname,
          loc_type: loc_type,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        alert("Updated Successfully");
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
            <Form.Label>Room Number You Want to Update</Form.Label>
            <Form.Control
              placeholder="C7-137"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Please Write The room Number need to be updated
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>New Room Number</Form.Label>
            <Form.Control
              placeholder="C7-137"
              value={newname}
              onChange={(e) => {
                setnew(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Please write The New room number
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group controlId="exampleForm.SelectCustomSizeLg">
            <Form.Label>Select Room Type</Form.Label>
            <Form.Control
              as="select"
              size="lg"
              value={loc_type}
              onChange={(e) => {
                settype(e.target.value);
              }}
            >
              <option>Lab</option>
              <option>Office</option>
              <option>Tutorial</option>
              <option>Hall</option>
            </Form.Control>
            <Form.Text className="text-muted">
              Select the room type you want to Update
            </Form.Text>
          </Form.Group>
        </Form>
        <Button
          class="d-flex justify-content-center"
          variant="danger"
          onClick={handle_update}
        >
          Update
        </Button>
      </Container>
    </div>
  );
};
export default UpdateLocation;
