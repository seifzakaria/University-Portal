import React from "react";
import axios from "axios";
import Nav from "../../../NavBars/Nav";

export default function ButtonsPage() {
  const token = localStorage.getItem("user");
  const assignToSlot = () => {
    axios({
      url: "http://localhost:8080/courseInstructor/assignInstructorToSlot ",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        id: "ac4",
        courseName: "mecha",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const assignToCC = () => {
    axios({
      url:
        "http://localhost:8080/courseInstructor/academicMemberToCourseCoordinator",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        id: "ac-4",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateA = () => {
    axios({
      url: "http://localhost:8080/courseInstructor/updateAnAssignment",
      method: "POST",
      headers: {
        token: token,
      },
      data: {
        id: "ac4",
        courseName: "mecha",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeA = () => {
    axios({
      url: "http://localhost:8080/courseInstructor/removeAnAssignedMember",
      method: "DELETE",
      headers: {
        token: token,
      },
      data: {
        id: "abc",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Nav />
      <div style={{ marginTop: "1vw", marginLeft: "49vw" }}>
        <button
          style={{ backgroundColor: "black", border: "none", color: "white" }}
          onClick={assignToSlot}
        >
          Assign to Slot
        </button>
        <button
          style={{
            backgroundColor: "black",
            border: "none",
            color: "white",
            marginLeft: "1vw",
          }}
          onClick={assignToCC}
        >
          Assign to CC
        </button>
      </div>

      <div style={{ marginTop: "1vw", marginLeft: "52vw" }}>
        <button
          style={{ backgroundColor: "black", border: "none", color: "white" }}
          onClick={removeA}
        >
          Delete
        </button>
        &nbsp;
        <button
          style={{ backgroundColor: "black", border: "none", color: "white" }}
          onClick={updateA}
        >
          Update
        </button>
      </div>
    </div>
  );
}
