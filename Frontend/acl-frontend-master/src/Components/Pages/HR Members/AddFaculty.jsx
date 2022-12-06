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

const AddFaculty = () => {
  const [name, setname] = useState("");
  const [snackbarMsg, setsnackbarMsg] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [show, setShow] = useState(true);

  const handle_add = () => {
    const token = localStorage.getItem("user");
    const decoded = jwt_decoded(token);
    axios
      .post(
        "http://localhost:8080/hrMember/addfaculty",
        {
          name: name,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        console.log(response);
        alert("New Faculty has been added");
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
              Enter a new faculty name
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
// <div>
//   <Container>
//     <Form>
//       <Form.Group>
//         <Form.Label>Faculty Name</Form.Label>
//         <Form.Control placeholder="@Engineering" />
//         <Form.Text className="text-muted">
//           Enter a new faculty name
//         </Form.Text>
//       </Form.Group>
//     </Form>
//     <Button variant="danger">Add</Button>
//   </Container>
// </div>

export default AddFaculty;
