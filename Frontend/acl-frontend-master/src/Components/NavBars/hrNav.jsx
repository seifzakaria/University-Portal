import React from "react";
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HRNav = () => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("user");
    history.push("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Profile" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.2">
              <Link to="/">View profile</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link style={{ textDecoration: "none" }} to="/attendance">
                Attendance
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link style={{ textDecoration: "none" }} to="/resetPassword">
                Reset password
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Academics" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/addLocation">Add location</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/updateLocation">Update location</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/deleteLocation">Delete location</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/addFac">Add faculty</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/updateFac">Update faculty</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/deleteFac">Delete faculty</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/addDep">Add Department</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/updateDep">Update Department</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/deleteDep">Delete Department</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="addCourse">Add Course</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/updateCourse">Update Course</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/deleteCourse">Delete Course</Link>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Staff members" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/addStaff">Add staff member</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/updateStaff">Update staff member</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/deleteStaff">Delete staff member</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/staffAttendance">Staff attendance</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/updateSalary">Update salary</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link>
            <Button variant="danger" onClick={logout}>
              Logout
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default HRNav;
