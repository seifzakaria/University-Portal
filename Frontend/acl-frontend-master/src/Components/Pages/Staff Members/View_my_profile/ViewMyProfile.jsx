import { Grid, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "./UpdateProfileModal";
import profilePic from "./Assets/profiePic.png";
import React, { useState, useEffect } from "react";
import jwt_decoded from "jwt-decode";
import Nav from "../../../NavBars/Nav";
const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  image: {
    height: 400,
    width: "auto",
  },
  signinButton: {
    backgroundColor: "#17355f",
    color: "white",
    "&:hover": {
      backgroundColor: "#17355f",
    },
  },
  signoutButton: {
    backgroundColor: "#ff0f0f",
    color: "white",
    "&:hover": {
      backgroundColor: "#ff0f0f",
    },
  },
}));

const ViewMyProfile = () => {
  const token = localStorage.getItem("user");
  const decoded = jwt_decoded(token);
  const [data, setData] = useState("");
  const [openModal, setOpenModal] = React.useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/staffMember/viewMyProfile", {
        headers: { token: token },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          return;
        } else {
          const res = response.data;
          setData({
            name: res.name,
            email: res.email,
            id: res.id,
            salary: res.salary,
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSignin = () => {
    axios
      .get("http://localhost:8080/staffMember/signin", {
        headers: { token: token },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert(response.data);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSignout = () => {
    axios
      .get("http://localhost:8080/staffMember/signout", {
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
        alert(error.message);
      });
  };
  const classes = useStyles();
  return (
    <div style={{ overflowY: "hidden", overflowX: "hidden" }}>
      <Nav />
      <Box m={0}>
        <Grid
          container
          spacing={4}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} sm={3}>
            <img className={classes.image} src={profilePic} alt="Profilepic" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <h2>{data.name}</h2>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={2} direction="row" justify="center">
          <Grid item>
            <Button
              onClick={handleSignin}
              className={classes.signinButton}
              variant="contained"
            >
              Sign in
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleSignout}
              className={classes.signoutButton}
              variant="contained"
            >
              Sign out
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mt={2}>
        <Grid container direction="row" justify="center">
          <Grid item>
            <Button
              onClick={handleClickOpen}
              className={classes.signinButton}
              variant="contained"
            >
              Edit profile
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box ml={3} mt={8}>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justify="center"
        >
          <Grid item xs={12} sm={4}>
            <h3>ID: {data.id}</h3>
          </Grid>
          <Grid item xs={12} sm={4}>
            <h3>Email: {data.email}</h3>
          </Grid>
          <Grid item xs={12} sm={4}>
            <h3>Salary: {data.salary}</h3>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={openModal}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        data={data}
        role={decoded.role}
      />
    </div>
  );
};

export default ViewMyProfile;
