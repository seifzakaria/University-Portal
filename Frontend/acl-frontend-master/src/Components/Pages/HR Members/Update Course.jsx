import React, { useState, useEffect } from "react";
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
const UpdateCourse = () => {
  const [name, setname] = useState("");
  const [newname, setnew] = useState("");
  const [department_name, setdep] = useState("");
  const [course_coordinator, setcc] = useState("");
  const token = localStorage.getItem("user");
  const decoded = jwt_decoded(token);
  const data = {};
  if (name.length != 0) {
    data.name = name;
  }
  if (newname.length != 0) {
    data.newname = newname;
  }
  if (department_name.length != 0) {
    data.department_name = department_name;
  }
  if (course_coordinator.length != 0) {
    data.course_coordinator = course_coordinator;
  }
  const handle_update = () => {
    axios
      .post(
        "http://localhost:8080/hrMember/UpdateCourse",

        data,

        { headers: { token: token } }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data);
          alert(response.data);
          alert(response.data.msg);
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
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              placeholder="@Physics"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter the Course name need to be updated
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>New Course Name</Form.Label>
            <Form.Control
              placeholder="@Biology"
              value={newname}
              onChange={(e) => {
                setnew(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter the new Course name , Leave it empty in case no need for
              modification
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Department</Form.Label>
            <Form.Control
              placeholder="@Engineering"
              value={department_name}
              onChange={(e) => {
                setdep(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter a new Department , Leave it empty in case no need for
              modification
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Course Coordinator</Form.Label>
            <Form.Control
              placeholder="@ac-4"
              value={course_coordinator}
              onChange={(e) => {
                setcc(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter the new Course Coordinator ID that will be assigned to this
              department , Leave it empty in case no need for modification
            </Form.Text>
          </Form.Group>
        </Form>

        <Button variant="danger" onClick={handle_update}>
          update
        </Button>
      </Container>
    </div>
  );
};
export default UpdateCourse;
