import React, { Component } from "react";
import { Container } from "react-bootstrap";

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
  Row,
} from "react-bootstrap";

class location extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Row>
          <Col xs={6} md={4}>
            <Image src="holder.js/171x180" rounded />
          </Col>
        </Container>
      </Row>
    );
  }
}

export default location;
