import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Button } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";
import axios from "axios"; 

export default function UpdateProfileModal(props) {
  const [email, setEmail] = useState("");
  const [salary, setsalary] = useState("");

  const handleUpdate = () => {
    // const data = { email: email, salary: salary };
    const token = localStorage.getItem("user");
    const body = {};
    if (email.length > 0) {
      body.email = email;
    }
    if (salary.length > 0) {
      body.salary = parseInt(salary);
    }
    axios
      .put("http://localhost:8080/staffMember/updateProfile", body, {
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
        console.log(error);
      });
    props.handleClose();
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update profile</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {props.role === "HR" ? (
          <TextField
            margin="dense"
            id="salary"
            label="Salary"
            type="Number"
            fullWidth
            value={salary}
            onChange={(e) => setsalary(e.target.value)}
          />
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
