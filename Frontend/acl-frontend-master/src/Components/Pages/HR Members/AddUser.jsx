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

const AddUser = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("M");
  const [role, setrole] = useState("");
  const [salary, setsalary] = useState("");
  const [day_off, setdayoff] = useState("");
  const [location_name, setlocation] = useState("");
  const token = localStorage.getItem("user");
  const decoded = jwt_decoded(token);
  const handle_add = () => {
    axios
      .post(
        "http://localhost:8080/hrMember/addUser",
        {
          name: name,
          email: email,
          gender: gender,
          role: role,
          salary: salary,
          day_off: day_off,
          location_name: location_name,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        console.log("add response", response);
        if (response.data.error) {
          alert(response.data.error);
        } else {
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
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />

            <Form.Text className="text-muted">Enter Users Name</Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="Example@gmail.com"
            />

            <Form.Text className="text-muted">Enter Email</Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group controlId="exampleForm.SelectCustomSizelg">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              size="lg"
              custom
              value={gender}
              onChange={(e) => {
                setgender(e.target.value);
              }}
              id="gender"
            >
              <option>M</option>
              <option>F</option>
            </Form.Control>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Salary</Form.Label>
            <Form.Control
              value={salary}
              onChange={(e) => {
                setsalary(e.target.value);
              }}
            />

            <Form.Text className="text-muted">Enter a Salary</Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group controlId="exampleForm.SelectCustomSizelg">
            <Form.Label>Day Off</Form.Label>
            <Form.Control
              as="select"
              size="lg"
              custom
              value={day_off}
              onChange={(e) => {
                setdayoff(e.target.value);
              }}
              id={day_off}
            >
              <option>Sunday</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Saturday</option>
            </Form.Control>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              size="lg"
              custom
              value={role}
              onChange={(e) => {
                setrole(e.target.value);
              }}
            >
              <option>HR</option>
              <option>TA</option>
              <option>CI</option>
              <option>CC</option>
              <option>HOD</option>
            </Form.Control>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Office Room Number</Form.Label>
            <Form.Control
              value={location_name}
              onChange={(e) => {
                setlocation(e.target.value);
              }}
              placeholder="@C7-137"
            />

            <Form.Text className="text-muted">
              Assign Room Number To The User
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
export default AddUser;
