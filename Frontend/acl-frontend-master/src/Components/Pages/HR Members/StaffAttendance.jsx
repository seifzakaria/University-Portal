import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withRouter } from "react-router-dom";
import Nav from "../../NavBars/Nav";

const token = localStorage.getItem("user");
let rows = [];

const useStyles = makeStyles({
  table: {
    width: 500,
  },
});

const StaffAttendance = () => {
  const token = localStorage.getItem("user");
  const [id, setid] = useState("");
  const [Rows, setRows] = useState([]);
  const [MissingDays, setMissingDays] = useState([]);

  const classes = useStyles();

  const handleViewAttendance = () => {
    if (id === "") {
      alert("enter id first");
      return;
    }
    axios
      .post(
        "http://localhost:8080/hrMember/ViewAttendenceRecord",
        {
          id: id,
        },
        { headers: { token: token } }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
          return;
        }
        setMissingDays(res.data.missing_days);
        const rows = [];
        const signins = res.data.sign_ins;
        const signouts = res.data.sign_outs;
        for (let index = 0; index < signins.length; index++) {
          const element = createData(signins[index], signouts[index]);
          rows.push(element);
        }
        setRows(rows);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleSignin = () => {
    if (id === "") {
      alert("enter id please");
      return;
    }

    axios
      .post(
        "http://localhost:8080/hrMember/addSignin",
        { id: id },
        { headers: { token: token } }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
          return;
        }
        alert(res.data.msg);
      });
  };

  const handleSignout = () => {
    if (id === "") {
      alert("enter id please");
      return;
    }

    axios
      .post(
        "http://localhost:8080/hrMember/addSignout",
        { id: id },
        { headers: { token: token } }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
          return;
        }
        alert(res.data.msg);
      });
  };

  return (
    <div>
      <Nav />
      <Box>
        <Box m={5}>
          <h1>Attendance</h1>
        </Box>
        <Box m={5} flexDirection="row" display="flex">
          <Box ml={5} mt={1}>
            <TextField
              value={id}
              onChange={(e) => {
                setid(e.target.value);
              }}
              label="Enter id"
            />
          </Box>
          <Box ml={5} mt={2}>
            <Button onClick={handleViewAttendance} variant="contained">
              View Attendance
            </Button>
          </Box>
          <Box ml={5} mt={2}>
            <Button onClick={handleSignin} variant="contained">
              Add signin
            </Button>
          </Box>
          <Box ml={5} mt={2}>
            <Button onClick={handleSignout} variant="contained">
              Add signout
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Sign in</TableCell>
                  <TableCell align="right">Sign out</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Rows.map((row, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align="right">{row.sign_in}</TableCell>
                      <TableCell align="right">{row.sign_out}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box m={5}>
          <Box>
            <h1>Missing days</h1>
          </Box>
          <Box display="flex" justifyContent="center">
            <TableContainer className={classes.table} component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Missing day</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MissingDays.map((row, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell align="center">{row}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

function createData(sign_in, sign_out) {
  return { sign_in, sign_out };
}

export default StaffAttendance;
