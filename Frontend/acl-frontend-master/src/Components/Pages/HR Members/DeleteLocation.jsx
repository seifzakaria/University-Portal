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

const DeleteLocation = () => {
  const [name, setname] = useState("");
  const [snackbarMsg, setsnackbarMsg] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const token = localStorage.getItem("user");
  const decoded = jwt_decoded(token);
  const handle_Delete = () => {
    axios
      .post(
        "http://localhost:8080/hrMember/DeleteLocation",
        {
          name: name,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        alert("The Location Has Been Deleted");
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
              Please Write The room number you want to delete
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
export default DeleteLocation;
