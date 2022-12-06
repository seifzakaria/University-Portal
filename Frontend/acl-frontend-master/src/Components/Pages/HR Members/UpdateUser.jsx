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
const UpdateUser = () => {
  const token = localStorage.getItem("user");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [office_loc, setloc] = useState("");
  const [id, setid] = useState("");

  const data = {};
  if (name.length != 0) {
    data.name = name;
  }
  if (email.length != 0) {
    data.email = email;
  }
  if (gender.length != 0) {
    data.gender = gender;
  }
  if (office_loc.length != 0) {
    data.office_loc = office_loc;
  }

  if (id.length != 0) {
    data.id = id;
  }
  const handle_update = () => {
    axios
      .post("http://localhost:8080/hrMember//User/UpdateUser", data, {
        headers: { token: token },
      })
      .then((response) => {
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
            <Form.Label>User ID</Form.Label>
            <Form.Control
              placeholder="@ac-4 or hr-4"
              value={id}
              onChange={(e) => {
                setid(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter the Users ID need to be updated
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Users Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter the new users name , Leave it empty in case no need for
              modification
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Example@gmail.com"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter a new Users Name , Leave it empty in case no need for
              modification
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Office Location</Form.Label>
            <Form.Control
              placeholder="@C7-163"
              value={office_loc}
              onChange={(e) => {
                setloc(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Enter the new Room Location that will be assigned to this
              department , Leave it empty in case no need for modification
            </Form.Text>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group>
            <Form.Label>Office Location</Form.Label>
            <Form.Control
              value={gender}
              onChange={(e) => {
                setgender(e.target.value);
              }}
            />
            <Form.Text className="text-muted"></Form.Text>
            Leave it empty in case no need for modification
          </Form.Group>
        </Form>

        <Button variant="danger" onClick={handle_update}>
          Update
        </Button>
      </Container>
    </div>
  );
};
export default UpdateUser;
