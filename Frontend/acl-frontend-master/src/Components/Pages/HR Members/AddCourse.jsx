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

const AddCourse = () => {
  const [name, setname] = useState("");
  const [department_name, setdep] = useState("");
  const [course_coordinator, setdCC] = useState("");

  const handle_add = () => {
    const token = localStorage.getItem("user");
    const decoded = jwt_decoded(token);
    const axios = require("axios").default;
    axios
      .post(
        "http://localhost:8080/hrMember/AddCourse",
        {
          name: name,
          department_name: department_name,
          course_coordinator: course_coordinator,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        console.log(response);
        alert("New Faculty Has Been Added");
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
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              placeholder="@Physics"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <Form.Text className="text-muted">The New Course Name</Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Department</Form.Label>
            <Form.Control
              placeholder="@MET"
              value={department_name}
              onChange={(e) => {
                setdep(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter the department id that the new course will be under
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Course Coordinator ID</Form.Label>
            <Form.Control
              placeholder="@ac-4"
              value={course_coordinator}
              onChange={(e) => {
                setdCC(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter the ID of coordinator that will be assigned to this course
            </Form.Text>
          </Form.Group>
        </Form>

        <Button
          class="d-flex justify-content-center"
          variant="danger"
          onClick={handle_add}
        >
          Add
        </Button>
      </Container>
    </div>
  );
};
export default AddCourse;
