import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { Button } from "@material-ui/core";
import Nav from "../../../NavBars/Nav";
const token = localStorage.getItem("user");

const useStyles = makeStyles((theme) => ({
  textarea: {
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "20%",
    },
    marginTop: "10px",
    marginBottom: "10px",
  },
  button: { marginTop: "10px" },
}));

const ResetPassword = () => {
  const [oldPass, setoldPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const classes = useStyles();

  const handleReset = () => {
    if (oldPass === "" || newPass === "" || confirmPass === "") {
      alert("One of the inputs is missing");
      return;
    }
    if (newPass !== confirmPass) {
      alert("Passwords are not matching");
      return;
    }
    axios
      .post(
        "http://localhost:8080/staffMember/resetPassword",
        {
          old_password: oldPass,
          password: newPass,
          password_confirmation: confirmPass,
        },
        { headers: { token: token } }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          return;
        } else {
          alert(response.data.msg);
          setnewPass("");
          setconfirmPass("");
          setoldPass("");
        }
      });
  };
  return (
    <div>
      <Nav />
      <Box
        mt={20}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          className={classes.textarea}
          value={oldPass}
          id="oldPass"
          label="Old Password"
          type="password"
          onChange={(e) => {
            setoldPass(e.target.value);
          }}
        />
        <TextField
          className={classes.textarea}
          value={newPass}
          onChange={(e) => {
            setnewPass(e.target.value);
          }}
          id="new"
          label="New Password"
          type="password"
        />
        <TextField
          className={classes.textarea}
          value={confirmPass}
          onChange={(e) => {
            setconfirmPass(e.target.value);
          }}
          id="confirm"
          label="Confirm password"
          type="password"
        />
        <Button
          onClick={handleReset}
          className={classes.button}
          variant="contained"
        >
          Reset password
        </Button>
      </Box>
    </div>
  );
};

export default ResetPassword;
