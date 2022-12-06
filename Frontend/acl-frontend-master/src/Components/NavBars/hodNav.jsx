import React from "react";
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const HODNav = () => {
  const history = useHistory();
  const viewDep = () => {
    history.push("/InstructorsListViewPerDep");
  };
  const logout = () => {
    localStorage.removeItem("user");
    history.push("/login");
  };
  const viewRequests = () => {
    history.push("/viewAllReq");
  };
  const viewTA = () => {
    history.push("/viewTeachingAssignments");
  };
  const viewCourses = () => {
    history.push("/coursesListView");
  };
  const viewDayOff = () => {
    history.push("/viewDayOffAll");
  };
  const compensationLeave = () => {
    history.push("/compensationLeave");
  };
  const annualLeave = () => {
    history.push("/annualLeave");
  };
  const maternityLeave = () => {
    history.push("/maternityLeave");
  };
  const sickLeave = () => {
    history.push("/sickLeave");
  };
  const accidentialLeave = () => {
    history.push("/accidentialLeave");
  };
  const viewAll = () => {
    history.push("/viewAll");
  };
  const viewAccepted = () => {
    history.push("/viewAccepted");
  };
  const viewPending = () => {
    history.push("/viewPending");
  };
  const viewRejected = () => {
    history.push("/viewRejected");
  };

  const viewSchedule = () => {
    history.push("/viewSchedule");
  };
  const changeDayOff = () => {
    history.push("/changeDayOff");
  };
  const sendReplacementReq = () => {
    history.push("/sendReplacementReq");
  };
  const viewReplacementReq = () => {
    history.push("/viewReplacementReq");
  };
  const slotLinkingReq = () => {
    history.push("/slotLinkingReq");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Profile" id="collasible-nav-dropdown">
            <NavDropdown.Item>
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
          <NavDropdown title="Staff" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={viewCourses}>
              View Staff Per Course
            </NavDropdown.Item>
            <NavDropdown.Item onClick={viewDep}>
              View Staff Per Department
            </NavDropdown.Item>
            <NavDropdown.Item onClick={viewDayOff}>
              View Day Off All
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Courses" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={viewCourses}>
              View All Courses
            </NavDropdown.Item>
            <NavDropdown.Item onClick={viewTA}>
              View Teaching Assigments
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Requests" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={viewRequests}>
              View All Requests
            </NavDropdown.Item>
            <NavDropdown.Item onClick={sendReplacementReq}>
              Send Replacement Requests
            </NavDropdown.Item>
            <NavDropdown.Item onClick={viewReplacementReq}>
              View Replacement Requests
            </NavDropdown.Item>
            <NavDropdown.Item onClick={slotLinkingReq}>
              Slot Linking Requests
            </NavDropdown.Item>
            <NavDropdown.Item onClick={changeDayOff}>
              Change Day Off
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Leave System" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={annualLeave}>
              Annual Leave
            </NavDropdown.Item>
            <NavDropdown.Item onClick={compensationLeave}>
              Compensation Leave
            </NavDropdown.Item>
            <NavDropdown.Item onClick={accidentialLeave}>
              Accidential Leave
            </NavDropdown.Item>
            <NavDropdown.Item onClick={sickLeave}>Sick Leave</NavDropdown.Item>
            <NavDropdown.Item onClick={maternityLeave}>
              Maternity Leave
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Requests Status" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={viewAll}>View All</NavDropdown.Item>
            <NavDropdown.Item onClick={viewAccepted}>
              View Accepted Requests
            </NavDropdown.Item>
            <NavDropdown.Item onClick={viewPending}>
              View Pending Requests
            </NavDropdown.Item>
            <NavDropdown.Item onClick={viewRejected}>
              View Rejected Requests
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link onClick={viewSchedule}>View schedule</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>
            <Button onClick={logout} variant="danger">
              Logout
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default HODNav;
