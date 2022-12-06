import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import isAuth from "../../../../Services/isAuth";
import { Redirect } from "react-router-dom";

import guc_logo from "./Assets/guc_logo.png";
const axios = require("axios").default;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  loginContainer: { height: "100vh" },
  textfield: { width: 300 },
  loginButton: {
    backgroundColor: "#17355f",
    color: "white",
    "&:hover": {
      backgroundColor: "#17355f",
    },
  },
  snackbar: {
    backgroundColor: "blue",
  },
}));

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [snackbarMsg, setsnackbarMsg] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = () => {
    if (email.length === 0 || password.length === 0) {
      setsnackbarMsg("Email and password are required");
      setOpen(true);

      return;
    }

    axios
      .post("http://localhost:8080/staffMember/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.error) {
          setsnackbarMsg(response.data.error);
          setOpen(true);
          return;
        }
        if (response.data.token) {
          localStorage.setItem("user", response.data.token);
          history.push("/");
        }
      })
      .catch((error) => {
        setsnackbarMsg("Error connecting to server");
        setOpen(true);
      });
  };
  if (isAuth() === true) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Grid
        className={classes.loginContainer}
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={3}
      >
        <Grid item>
          <img src={guc_logo} alt="guc_logo" />
        </Grid>
        <Grid item>
          <TextField
            required
            className={classes.textfield}
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            id="email"
            label="Email"
          />
        </Grid>
        <Grid item>
          <TextField
            type="password"
            required
            className={classes.textfield}
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            id="password"
            label="Password"
          />
        </Grid>
        <Grid item>
          <Button
            disableRipple
            className={classes.loginButton}
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity="error"
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
