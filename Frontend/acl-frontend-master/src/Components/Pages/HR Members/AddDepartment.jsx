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

const Add_department = () => {
  const [name, setname] = useState("");
  const [facultyy, setfacultyy] = useState("");
  const [hod, sethod] = useState("");
  const token = localStorage.getItem("user");
  const decoded = jwt_decoded(token);
  const handle_add = () => {
    axios
      .post(
        "http://localhost:8080/hrMember/AddDepartment",
        {
          name: name,
          facultyy: facultyy,
          hod: hod,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        console.log(response);
        alert("A New Department has beeen added");
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };

  return (
    <Container>
      <Nav />
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
            Please Write The New Department Name
          </Form.Text>
        </Form.Group>
      </Form>

      <Form>
        <Form.Group>
          <Form.Label>Faculty</Form.Label>
          <Form.Control
            placeholder="@Engineering"
            value={facultyy}
            onChange={(e) => {
              setfacultyy(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            Enter the facultyID that the new Department will be under
          </Form.Text>
        </Form.Group>
      </Form>

      <Form>
        <Form.Group>
          <Form.Label>Head Of Department ID</Form.Label>
          <Form.Control
            placeholder="@ac-4"
            value={hod}
            onChange={(e) => {
              sethod(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            Please Assign A Head For The New Department
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
  );
};

//         return <Container>
//            <Form>
//                <Form.Group>
//                    <Form.Label>
//                       Department Name
//                    </Form.Label>
// <Form.Control placeholder="@Met"/>
// <Form.Text className="text-muted">
//     Please Write The New Department Name
//         </Form.Text>
//         </Form.Group>
//         </Form>

//         <Form>
//                <Form.Group>
//                    <Form.Label>
//                       Faculty ID
//                    </Form.Label>
// <Form.Control placeholder="@5fe534c68c1d974ad8e365f3"/>
// <Form.Text className="text-muted">
//     Enter the facultyID that the new Department will be under
//         </Form.Text>
//         </Form.Group>
//         </Form>

//         <Form>
//                <Form.Group>
//                    <Form.Label>
//                       Head Of Department ID
//                    </Form.Label>
// <Form.Control placeholder="@5fe534c68c1d974ad8e365f3"/>
// <Form.Text className="text-muted">
//     Please Assign A Head For The New Department
//         </Form.Text>
//         </Form.Group>
//         </Form>
//         <Button  class="d-flex justify-content-center" variant="danger">Add</Button>
//         </Container>

export default Add_department;
