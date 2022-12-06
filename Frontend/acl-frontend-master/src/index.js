import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";

import ProtectedRoute from "./Services/ProtectedRoute";

//staff members
import Login from "./Components/Pages/Staff Members/Login/Login";
import ViewMyProfile from "./Components/Pages/Staff Members/View_my_profile/ViewMyProfile";
import ResetPassowrd from "./Components/Pages/Staff Members/Reset password/ResetPassowrd";

//nav bars
import Nav from "./Components/NavBars/Nav";

//course instructor
import viewSlotsAssignment from "./Components/Pages/Academic Members/Course Instructor/viewSlots";
import ViewCoverage from "./Components/Pages/Academic Members/Course Instructor/viewCoverage";
import ViewAllStaff from "./Components/Pages/Academic Members/Course Instructor/viewAllStaff";
import ButtonsPage from "./Components/Pages/Academic Members/Course Instructor/buttonsPage";
import coursesCI from "./Components/Pages/Academic Members/Course Instructor/coursesCI";

//hod
import CoursesListView from "./Components/List Views HOD/coursesListView";
import InstructorsListViewPerDep from "./Components/List Views HOD/InstructorsListViewPerDep";
import ButtonsPageHod from "./Components/List Views HOD/buttonsPageHOD";
import InstructorsListViewPerCourse from "./Components/List Views HOD/InstructorsListViewPerCourse";
import ButtonsPageHod2 from "./Components/List Views HOD/buttonsPageHOD2";
import viewAllReq from "./Components/Pages/Academic Members/HOD/viewAllReq";
import viewTeachingAssignments from "./Components/Pages/Academic Members/HOD/viewTeachingAssignments";
import ViewDayOffAll from "./Components/Pages/Academic Members/HOD/viewDayOffAll";
import ViewDayOffX from "./Components/Pages/Academic Members/HOD/viewDayOffX";
import AcceptRejectReq from "./Components/Pages/Academic Members/HOD/acceptRejectReq";
import ViewCoverageHOD from "./Components/Pages/Academic Members/HOD/viewCoverageHOD";
import ViewAttendance from "./Components/Pages/Staff Members/View Attendance/ViewAttendance";

//academic member
import CompensationLeave from "./Components/Pages/Academic Members/Academic Member/Leave System/CompensationLeave";
import AccidentialLeave from "./Components/Pages/Academic Members/Academic Member/Leave System/AccidentialLeave";
import AnnualLeave from "./Components/Pages/Academic Members/Academic Member/Leave System/AnnualLeave";
import MaternityLeave from "./Components/Pages/Academic Members/Academic Member/Leave System/MaternityLeave";
import SickLeave from "./Components/Pages/Academic Members/Academic Member/Leave System/SickLeave";
import viewAll from "./Components/Pages/Academic Members/Academic Member/Requests Status/ViewAll";
import viewAccepted from "./Components/Pages/Academic Members/Academic Member/Requests Status/ViewAccepted";
import ViewPending from "./Components/Pages/Academic Members/Academic Member/Requests Status/ViewPending";
import viewRejected from "./Components/Pages/Academic Members/Academic Member/Requests Status/ViewRejected";
import ViewSchedule from "./Components/Pages/Academic Members/Academic Member/ViewSchedule";
import SendReplacementReq from "./Components/Pages/Academic Members/Academic Member/SendReplacementReq";
import ViewReplacementReq from "./Components/Pages/Academic Members/Academic Member/ViewReplacementReq";
import SlotLinkingReq from "./Components/Pages/Academic Members/Academic Member/SlotLinkingReq";
import changeDayOff from "./Components/Pages/Academic Members/Academic Member/ChangeDayOff";
import { SlotLinkingRequests } from "./Components/Pages/Academic Members/Course Coordinator/SlotLinkingRequests";
import { CourseSlots } from "./Components/Pages/Academic Members/Course Coordinator/CourseSlots";

//HR
import AddLocation from "./Components/Pages/HR Members/AddLocation";
import DeleteLocation from "./Components/Pages/HR Members/DeleteLocation";
import UpdateLocation from "./Components/Pages/HR Members/UpdateLocation";
import AddFaculty from "./Components/Pages/HR Members/AddFaculty";
import UpdateFaculty from "./Components/Pages/HR Members/UpdateFaculty";
import DeleteFaculty from "./Components/Pages/HR Members/DeleteFaculty";
import AddDepartment from "./Components/Pages/HR Members/AddDepartment";
import UpdateDepartment from "./Components/Pages/HR Members/UpdateDepartment";
import DeleteDepartment from "./Components/Pages/HR Members/DeleteDepartment";
import UpdateCourse from "./Components/Pages/HR Members/Update Course";
import AddCourse from "./Components/Pages/HR Members/AddCourse";
import DeleteCourse from "./Components/Pages/HR Members/DeleteCourse";
import AddStaff from "./Components/Pages/HR Members/AddUser";
import DeleteStaff from "./Components/Pages/HR Members/DeleteUser";
import UpdateStaff from "./Components/Pages/HR Members/UpdateUser";
import StaffAttendance from "./Components/Pages/HR Members/StaffAttendance";
import UpdateSalary from "./Components/Pages/HR Members/UpdateSalary";

ReactDOM.render(
  <Router>
    {/* <Nav /> */}
    {/* Staff members routes */}
    <Route path="/login" exact component={Login} />
    <ProtectedRoute path="/" exact component={ViewMyProfile} />
    <ProtectedRoute path="/resetPassword" exact component={ResetPassowrd} />
    <ProtectedRoute path="/attendance" exact component={ViewAttendance} />

    {/*Course Coordinator*/}
    <ProtectedRoute path="/courseSlots" exact component={CourseSlots} />
    <ProtectedRoute
      path="/slotLinkingRequests"
      exact
      component={SlotLinkingRequests}
    />

    {/*Course Instructor*/}
    <ProtectedRoute
      path="/login/CI/viewCoverage"
      exact
      component={ViewCoverage}
    />
    <ProtectedRoute
      path="/login/CI/viewSlotsAssignment"
      exact
      component={viewSlotsAssignment}
    />
    <ProtectedRoute
      path="/login/CI/viewAllStaff"
      exact
      component={ViewAllStaff}
    />
    <ProtectedRoute
      path="/login/CI/buttonsPage"
      exact
      component={ButtonsPage}
    />
    <ProtectedRoute path="/login/CI/coursesCI" exact component={coursesCI} />

    {/*HOD*/}
    <ProtectedRoute path="/coursesListView" exact component={CoursesListView} />
    <ProtectedRoute path="/buttonsPageHod" exact component={ButtonsPageHod} />
    <ProtectedRoute
      path="/InstructorsListViewPerDep"
      exact
      component={InstructorsListViewPerDep}
    />
    <ProtectedRoute path="/viewAllReq" exact component={viewAllReq} />
    <ProtectedRoute
      path="/viewTeachingAssignments"
      exact
      component={viewTeachingAssignments}
    />
    <ProtectedRoute path="/viewDayOffAll" exact component={ViewDayOffAll} />
    <ProtectedRoute path="/viewDayOffX" exact component={ViewDayOffX} />
    <ProtectedRoute path="/acceptReject" exact component={AcceptRejectReq} />
    <ProtectedRoute path="/viewCoverageHOD" exact component={ViewCoverageHOD} />
    <ProtectedRoute path="/viewCov" exact component={ViewCoverage} />
    <ProtectedRoute
      path="/InstructorsListViewPerCourse"
      exact
      component={InstructorsListViewPerCourse}
    />
    <ProtectedRoute path="/buttonsPageHod2" exact component={ButtonsPageHod2} />

    {/*Academic Members*/}
    <ProtectedRoute
      path="/compensationLeave"
      exact
      component={CompensationLeave}
    />
    <ProtectedRoute
      path="/accidentialLeave"
      exact
      component={AccidentialLeave}
    />
    <ProtectedRoute path="/annualLeave" exact component={AnnualLeave} />
    <ProtectedRoute path="/maternityLeave" exact component={MaternityLeave} />
    <ProtectedRoute path="/sickLeave" exact component={SickLeave} />
    <ProtectedRoute path="/viewAll" exact component={viewAll} />
    <ProtectedRoute path="/viewAccepted" exact component={viewAccepted} />
    <ProtectedRoute path="/viewPending" exact component={ViewPending} />
    <ProtectedRoute path="/viewRejected" exact component={viewRejected} />
    <ProtectedRoute
      path="/sendReplacementReq"
      exact
      component={SendReplacementReq}
    />
    <ProtectedRoute
      path="/viewReplacementReq"
      exact
      component={ViewReplacementReq}
    />
    <ProtectedRoute path="/SlotLinkingReq" exact component={SlotLinkingReq} />
    <ProtectedRoute path="/viewSchedule" exact component={ViewSchedule} />
    <ProtectedRoute path="/changeDayOff" exact component={changeDayOff} />

    {/* HR members */}
    <ProtectedRoute path="/addLocation" exact component={AddLocation} />
    <ProtectedRoute path="/deleteLocation" exact component={DeleteLocation} />
    <ProtectedRoute path="/updateLocation" exact component={UpdateLocation} />
    <ProtectedRoute path="/addFac" exact component={AddFaculty} />
    <ProtectedRoute path="/updateFac" exact component={UpdateFaculty} />
    <ProtectedRoute path="/deleteFac" exact component={DeleteFaculty} />
    <ProtectedRoute path="/addDep" exact component={AddDepartment} />
    <ProtectedRoute path="/updateDep" exact component={UpdateDepartment} />
    <ProtectedRoute path="/deleteDep" exact component={DeleteDepartment} />
    <ProtectedRoute path="/addCourse" exact component={AddCourse} />
    <ProtectedRoute path="/updateCourse" exact component={UpdateCourse} />
    <ProtectedRoute path="/deleteCourse" exact component={DeleteCourse} />
    <ProtectedRoute path="/addStaff" exact component={AddStaff} />
    <ProtectedRoute path="/updateStaff" exact component={UpdateStaff} />
    <ProtectedRoute path="/deleteStaff" exact component={DeleteStaff} />
    <ProtectedRoute path="/staffAttendance" exact component={StaffAttendance} />
    <ProtectedRoute path="/updateSalary" exact component={UpdateSalary} />
  </Router>,

  document.getElementById("root")
);
