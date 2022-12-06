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

const Update_Salary = () => {
  const [id, setid] = useState("");
  const [salary, setsalary] = useState("");
  const token = localStorage.getItem("user");
  const decoded = jwt_decoded(token);
  const handle_update = () => {
    axios
      .post(
        "http://localhost:8080/hrMember/updateSalary",
        {
          id: id,
          salary: salary,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Updated Successfully");
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
              Enter The User ID You Want TO Update
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>New Salary </Form.Label>

            <Form.Control
              value={salary}
              onChange={(e) => {
                setsalary(e.target.value);
              }}
            />

            <Form.Text className="text-muted">Enter The new Salary</Form.Text>
          </Form.Group>
        </Form>

        <Button variant="danger" onClick={handle_update}>
          Update
        </Button>
      </Container>
    </div>
  );
};
export default Update_Salary;
