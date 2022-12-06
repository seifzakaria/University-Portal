import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
const token = localStorage.getItem("user");

export const CourseSoltsModal = (props) => {
  const [location, setlocation] = useState("");
  const [weekday, setweekday] = useState("");
  const [slotNumber, setslotNumber] = useState("");
  const handleAdd = () => {
    axios
      .post(
        "http://localhost:8080/courseCoordinator/AddSlot",
        {
          slot_number: slotNumber,
          location: location,
          day: weekday,
          course_id: props.data._id,
        },
        { headers: { token: token } }
      )
      .then((res) => {
        alert(res.data.message);
      })
      .catch((error) => {
        alert(error.response.data.details[0].message);
        console.log(error.response);
      });
    props.setOp(false);
  };
  return (
    <div>
      <Dialog
        open={props.op}
        onClose={() => {
          props.setOp(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add slot</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => {
              setslotNumber(e.target.value);
            }}
            value={slotNumber}
            autoFocus
            margin="dense"
            id="slot_number"
            label="Slot number"
            fullWidth
            type="Number"
          />
          <TextField
            onChange={(e) => {
              setlocation(e.target.value);
            }}
            value={location}
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            fullWidth
          />
          <TextField
            onChange={(e) => {
              setweekday(e.target.value);
            }}
            value={weekday}
            autoFocus
            margin="dense"
            id="Weekday"
            label="Weekday"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setOp(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button color="primary" onClick={handleAdd}>
            Add slot
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CourseSoltsModal;
