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
import Nav from "../../../NavBars/Nav";
const token = localStorage.getItem("user");
let rows = [];

const useStyles = makeStyles({
  table: {
    width: 500,
  },
});

const ViewAttendance = () => {
  const [Month, setMonth] = useState(1);
  const [Year, setYear] = useState("");
  const [Rows, setRows] = useState([]);
  const [MissingDays, setMissingDays] = useState([]);
  const [HoursAttended, setHoursAttended] = useState("");

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/staffMember/viewAttendance",
        {},
        {
          headers: { token: token },
        }
      )
      .then((res) => {
        if (!res.data.error) {
          const signIns = res.data.sign_ins;
          const signOuts = res.data.sign_outs;
          for (let i = 0; i < signIns.length; i++) {
            const signin = signIns[i];
            const signout = signOuts[i];
            const row = createData(signin, signout);
            rows.push(row);
          }
          setRows(rows);
        }
      })
      .catch((err) => {});

    axios
      .get("http://localhost:8080/staffMember/viewMissingDays", {
        headers: { token: token },
      })
      .then((res) => {
        if (!res.data.error) {
          setMissingDays(res.data.missing_days);
        }
      });

    axios
      .get("http://localhost:8080/staffMember/viewHours", {
        headers: { token: token },
      })
      .then((res) => {
        setHoursAttended(res.data.msg);
      });
  }, []);

  const handleFilter = () => {
    rows = [];
    const data = {};
    if (Year.length > 0) {
      data.year = Year;
    }
    data.month = Month;
    axios
      .post("http://localhost:8080/staffMember/viewAttendance", data, {
        headers: { token: token },
      })
      .then((res) => {
        if (!res.data.error) {
          if (!res.data.error) {
            const signIns = res.data.sign_ins;
            const signOuts = res.data.sign_outs;
            for (let i = 0; i < signIns.length; i++) {
              const signin = signIns[i];
              const signout = signOuts[i];
              const row = createData(signin, signout);
              rows.push(row);
            }
            setRows(rows);
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const classes = useStyles();

  return (
    <div>
      <Nav />
      <Box>
        <Box m={5}>
          <h1>Attendance</h1>
        </Box>
        <Box m={5} flexDirection="row" display="flex">
          <Box mr={5}>
            <InputLabel id="month-select">Month</InputLabel>
            <Select
              value={Month}
              onChange={(e) => {
                setMonth(e.target.value);
              }}
            >
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </Box>
          <Box ml={5} mt={1}>
            <TextField
              value={Year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              label="Year"
              type="Number"
            />
          </Box>
          <Box ml={5} mt={2}>
            <Button onClick={handleFilter} variant="contained">
              Filter
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
        <Box m={5}>
          <Box>
            <h1>Hours attended</h1>
          </Box>
          <Box mt={10}>
            <h5>{HoursAttended}</h5>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

function createData(sign_in, sign_out) {
  return { sign_in, sign_out };
}

export default ViewAttendance;
