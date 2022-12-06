import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Link,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import CourseSoltsModal from "./CourseSoltsModal";
import Nav from "../../../NavBars/Nav";

const axios = require("axios").default;
const token = localStorage.getItem("user");

export const CourseSlots = () => {
  const [Courses, setCourses] = useState([]);
  const [SelectedCourse, setSelectedCourse] = useState("");
  const [open, setOpen] = useState(false);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/courseCoordinator/myCourses", {
        headers: { token: token },
      })
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:8080/courseCoordinator/DeleteSlot", {
        headers: { token: token },
        data: { slot_id: id },
      })
      .then((res) => {
        console.log(res);
        if (res.data.msg) {
          alert(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const handleAddSlot = () => {
    if (SelectedCourse === "") {
      alert("Select a course first");
    } else {
      setOpen(true);
      console.log(SelectedCourse);
    }
  };
  const handleSelect = (e) => {
    axios
      .post("http://localhost:8080/courseCoordinator/slotsOfCourse", {
        course_id: e.target.value._id,
      })
      .then((res) => {
        setSlots(res.data.slots);
      });

    setSelectedCourse(e.target.value);
  };
  return (
    <div>
      <Nav />
      <Box m={5}>
        <Box>
          <h1>Course slots</h1>
        </Box>
        <Box mt={10} ml={5}>
          <InputLabel id="Course">Select Course</InputLabel>
          <Select
            style={{ width: 200 }}
            labelId="Course"
            id="select-course"
            defaultValue={SelectedCourse}
            value={SelectedCourse}
            onChange={handleSelect}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Courses.map((course) => {
              return (
                <MenuItem key={course._id} value={course}>
                  {course.name}
                </MenuItem>
              );
            })}
          </Select>

          <Button onClick={handleAddSlot}>Add slot</Button>
        </Box>

        <Box
          ml={5}
          mt={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          {slots.map((slot, i) => {
            return (
              <Box mt={2} key={i}>
                <h6>
                  Slot number {slot.slot_number} on {slot.day} at{" "}
                  {slot.location}
                </h6>
                <Link
                  onClick={() => {
                    handleDelete(slot._id);
                  }}
                >
                  Delete
                </Link>
              </Box>
            );
          })}
        </Box>
      </Box>
      <CourseSoltsModal op={open} setOp={setOpen} data={SelectedCourse} />
    </div>
  );
};
