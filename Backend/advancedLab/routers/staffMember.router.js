const express = require("express");
const router = express.Router();

const {
  login,
  logout,
  viewMyProfile,
  resetPassword,
  viewAttendanceRecord,
  view_hours,
  updateMyProfile,
  viewMissingDays,
  signin,
  signout,
} = require("../controllers/staffMember.controller");
const verifyToken = require("../auth/verifyToken");

router.post("/login", login);
router.get("/logout", logout);
router.get("/viewMyProfile", viewMyProfile);
router.post("/resetPassword", resetPassword);
router.post("/viewAttendance", viewAttendanceRecord);
router.get("/viewMissingDays", viewMissingDays);
router.get("/viewHours", view_hours);
router.put("/updateProfile", updateMyProfile);
router.get("/signin", signin);

router.get("/signout", signout);
module.exports = router;