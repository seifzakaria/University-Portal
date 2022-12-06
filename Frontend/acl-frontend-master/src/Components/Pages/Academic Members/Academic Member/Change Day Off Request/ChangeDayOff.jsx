import React, { useState } from "react";
import {
  Box,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
const axios = require("axios").default;
const SendDayOffRequest = () => {
  const token = localStorage.getItem("user");
  const [selectedDay, setselectedDay] = useState("");
  const [reason, setreason] = useState("");
  const handleSubmit = () => {
    if (selectedDay === "" || reason === "") {
      alert("One of the inputs is missing");
    }
    axios
      .post(
        "http://localhost:8080/academicMember/dayOffReq",
        {
          newDayOff: selectedDay,
          reason: reason,
        },
        { headers: { token: token } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div>
      <Box m={5}>
        <h1>Change day off request</h1>
      </Box>
      <Box m={5}>
        <InputLabel id="demo-simple-select-label">Select day off</InputLabel>
        <Select
          style={{ width: 200 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedDay}
          onChange={(e) => {
            setselectedDay(e.target.value);
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Sunday">Sunday</MenuItem>
          <MenuItem value="Monday">Monday</MenuItem>
          <MenuItem value="Tuesday">Tuesday</MenuItem>
          <MenuItem value="Wednesday">Wednesday</MenuItem>
          <MenuItem value="Thursday">Thursday</MenuItem>
          <MenuItem value="Saturday">Saturday</MenuItem>
        </Select>
      </Box>
      <Box m={5}>
        <TextField
          style={{ width: 300 }}
          id="reason"
          label="Reason"
          multiline
          rows={8}
          value={reason}
          onChange={(e) => {
            setreason(e.target.value);
          }}
          variant="outlined"
        />
      </Box>
      <Box m={5}>
        <Button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default SendDayOffRequest;
