const mongoose = require("mongoose");
const academicMembers = require("../models/academicMembers.model");
const hrMembers = require("../models/hrMembers.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const {
  logoutValidation,
  loginValidation,
  viewMyProfileValidation,
  resetPasswordValidation,
  updateMyProfileValidation,
  viewAttendanceValidation,
} = require("../validations/staffMember.validation");
const { use } = require("../routers/staffMember.router");
const { func, boolean } = require("joi");
require("dotenv").config();

const login = async (req, res) => {
  //check if the body entered is valid
  let hrMember = false;
  const validation = loginValidation.validate(req.body);
  if (validation.error)
    return res.status(400).json({ error: validation.error.message });

  let { email, password } = req.body;
  email = email.toLowerCase();
  try {
    let user = await academicMembers.findOne({ email: email }).exec();
    if (!user) {
      user = await hrMembers.findOne({ email: email }).exec();
      hrMember = user ? true : false;
      if (!user) {
        return res.status(400).json({ error: "User is not found" });
      }
    }
    let message = null;
    const isPassworWeak = await bcrypt.compare("123456", user.password);
    if (isPassworWeak == true) {
      message = "It is recommended to change your password";
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ error: "Invalid password" });
    }

    //create token server for particlar user to prevent hacking and to relate session to this user
    const role = hrMember == true ? "HR" : "Academic";
    const jwt_Password = process.env.JWT;
    const token = jwt.sign({ id: user._id, role: role }, jwt_Password);

    res.json({
      token: token,
      comments: message,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const logout = async (req, res) => {
  res.json({ msg: "logged out successfully" });
};

const viewMyProfile = async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ error: "Token is required" });
  }
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT);
    let user = await academicMembers
      .findById(decodedToken.id)
      .exec()

      .catch((err) => {
        return res.json({ error: err });
      });
      
    if (!user) {
      user = await hrMembers
        .findById(decodedToken.id)
        .exec()

        .catch((err) => {
          return res.json({ error: err });
        });
    }
    
    if (!user) {
      return res.json({ error: "User not found" });
    }
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      salary: user.salary,
    });
  } catch (err) {
    res.json({ error: err });
  }
};

const resetPassword = async (req, res) => {
  if (!req.headers.token) {
    return res.json({ error: "Token is required" });
  }
  validation = resetPasswordValidation.validate(req.body);
  if (validation.error) {
    return res.json({ error: validation.error.message });
  }
  try {
    const decodedToken = jwt.verify(req.headers.token, process.env.JWT);

    if (!decodedToken.id) {
      return res.json({ error: "worng token entered" });
    }
    let user = null;
    if (decodedToken.role == "HR") {
      user = await hrMembers.findById(decodedToken.id).exec();
    }
    if (decodedToken.role !== "HR") {
      user = await academicMembers.findById(decodedToken.id).exec();
    }
    const oldPasswordMatched = await bcrypt.compare(
      req.body.old_password,
      user.password
    );

    if (oldPasswordMatched == false) {
      return res.json({ error: "Old password is invalid" });
    }

    if (decodedToken.role == "HR") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      hrMembers.findByIdAndUpdate(
        { _id: decodedToken.id },
        { password: hashedPassword },
        function (err, result) {
          if (err) {
            return res.json({ error: err });
          } else {
            return res.json({ msg: "Password changed" });
          }
        }
      );
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      academicMembers.findByIdAndUpdate(
        { _id: decodedToken.id },
        { password: hashedPassword },
        function (err, result) {
          if (err) {
            return res.json({ error: err });
          } else {
            return res.json({ msg: "Password changed" });
          }
        }
      );
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

const viewAttendanceRecord = async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ error: "token is required" });
  }
  const validation = viewAttendanceValidation.validate(req.body);
  if (validation.error) {
    return res.json({ error: validation.error.message });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT);
    let user = null;
    if (decodedToken.role == "HR") {
      user = await hrMembers.findById(decodedToken.id).exec();
    }
    if (decodedToken.role !== "HR") {
      user = await academicMembers.findById(decodedToken.id).exec();
    }
    if (!user) {
      return res.json({ error: "wrong id" });
    }
    const sign_ins = user.sign_in;
    const sign_outs = user.sign_out;
    const sign_ins_formated = [];
    const sign_outs_formated = [];
    for (let i = 0; i < sign_ins.length; i++) {
      let time = moment(sign_ins[i]);
      let flag = true;
      if (req.body.month) {
        const month = req.body.month - 1;
        if (time.month() != month) {
          flag = false;
        }
      }
      if (req.body.year) {
        const year = req.body.year;
        if (time.year() != year) {
          flag = false;
        }
      }

      if (flag == true) {
        sign_ins_formated.push(time.format("DD/MM/YYYY, hh:mm:ss"));
      }
    }
    for (let i = 0; i < sign_outs.length; i++) {
      let time = moment(sign_outs[i]);
      let flag = true;
      if (req.body.month) {
        const month = req.body.month - 1;
        if (time.month() != month) {
          flag = false;
        }
      }
      if (req.body.year) {
        const year = req.body.year;
        if (time.year() != year) {
          flag = false;
        }
      }

      if (flag == true) {
        sign_outs_formated.push(time.format("DD/MM/YYYY, hh:mm:ss"));
      }
    }
    return res.json({
      sign_ins: sign_ins_formated,
      sign_outs: sign_outs_formated,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
};

const view_hours = async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ error: "token is required" });
  }
  const decodedToken = jwt.verify(token, process.env.JWT);

  let user = null;
  if (decodedToken.role == "HR") {
    user = await hrMembers.findById(decodedToken.id).exec();
  }
  if (decodedToken.role !== "HR") {
    user = await academicMembers.findById(decodedToken.id).exec();
  }
  if (!user) {
    return res.json({ msg: "User not found" });
  }

  const hours_attended = user.total_hours_attended;
  let totalHours = "00:00:00";
  for (let i = 0; i < user.number_of_days_to_attend; i++) {
    totalHours = sumTime("8:24:00", totalHours);
  }
  const message =
    "You attended " + hours_attended + " out of " + totalHours + " hours";

  return res.json({ msg: message });
};

const updateMyProfile = async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ error: "token is required" });
  }
  const validation = updateMyProfileValidation.validate(req.body);
  if (validation.error) {
    return res.json({ error: validation.error.message });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT);
    const body = req.body;
    if (body.id || body.name) {
      return res.json({ error: "No user can update the id or name" });
    }
    if (decodedToken.role == "HR") {
      if (body.email) {
        let user = await hrMembers.find({ email: body.email }).exec();

        if (user.length > 0) {
          return res.json({ error: "Email already exists" });
        }
        user = await academicMembers.find({ email: body.email }).exec();
        if (user.length > 0) {
          return res.json({ error: "Email already exists" });
        }
      }
      if (!body.email && !body.salary) {
        return res.json({
          error: "There should be at lease email or salary attributes in body",
        });
      }
      hrMembers.findByIdAndUpdate(
        decodedToken.id,
        { email: body.email, salary: body.salary },
        (err, doc) => {
          if (err) {
            return res.json({ error: err });
          }
          return res.json({ msg: "Updated profile" });
        }
      );
    }
    if (body.salary) {
      return res.json({ error: "Only HR can update their salary 🤑 " });
    }
    if (decodedToken.role !== "HR") {
      if (body.email) {
        let user = await hrMembers.find({ email: body.email }).exec();

        if (user.length > 0) {
          return res.json({ error: "Email already exists" });
        }
        user = await academicMembers.find({ email: body.email }).exec();
        if (user.length > 0) {
          return res.json({ error: "Email already exists" });
        }
      }
      if (!body.email) {
        return res.json({
          error: "There should be at lease email attribute",
        });
      }
    }
    academicMembers.findByIdAndUpdate(
      decodedToken.id,
      { email: body.email },
      (err, doc) => {
        if (err) {
          return res.json({ error: err });
        }
        return res.json({ msg: "Updated profile" });
      }
    );
  } catch (error) {
    return res.json({ error: "error verifying token" });
  }
};


const viewMissingDays = async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ error: "token is required" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT);
    let user = null;
    if (decodedToken.role == "HR") {
      user = await hrMembers.findById(decodedToken.id).exec();
    }
    if (decodedToken.role !== "HR") {
      user = await academicMembers.findById(decodedToken.id).exec();
    }
    if (!user) {
      res.json({ error: "User not found" });
    }
    res.json({ missing_days: user.missing_days });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const signin = async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ error: "token required" });
  }

  try {
    // const decodedToken = jwt.verify(token, process.env.JWT);
    const decodedToken = jwt.verify(token, process.env.JWT);
    let user = null;
    if (decodedToken.role == "HR") {
      user = await hrMembers.findById(decodedToken.id);
    } else {
      user = await academicMembers.findById(decodedToken.id);
    }
    if (!user) {
      return res.json({ error: "user not found" });
    }
    if (user.sign_in.length > user.sign_out.length) {
      return res.json({ error: "You are already signed in" });
    }
    user.sign_in.push(moment().format());
    user.save();
    return res.json("Successfully signed in" );
  } catch (error) {
    res.send({ error: error.message });
  }
};

const signout = async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ error: "token required" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT);
    let user = null;
    if (decodedToken.role == "HR") {
      user = await hrMembers.findById(decodedToken.id);
    } else {
      user = await academicMembers.findById(decodedToken.id);
    }
    if (!user) {
      return res.json({ error: "user not found" });
    }
    if (user.sign_in.length == user.sign_out.length) {
      return res.json({ error: "You are already signed out" });
    }

    let signin_time = user.sign_in;
    signin_time = signin_time[signin_time.length - 1];
    signin_time = moment(signin_time);
    let signout_time = moment();
    user.sign_out.push(signout_time);
    var sevenam = moment("7:00am", "h:mma");
    var sevenpm = moment("7:00pm", "h:mma");
    if (
      signin_time.isBefore(sevenam) &&
      signout_time.isBetween(sevenam, sevenpm)
    ) {
      const timedif = signout_time.diff(sevenam);
      const tempTime = moment.duration(timedif);
      const timeSpent =
        tempTime.hours() + ":" + tempTime.minutes() + ":" + tempTime.seconds();
      if (user.total_hours_attended == "0") {
        const time_addition = sumTime(timeSpent, "00:00:00");
        user.total_hours_attended = time_addition;
      } else {
        const time_addition = sumTime(timeSpent, user.total_hours_attended);
        user.total_hours_attended = time_addition;
      }
      res.json({ msg: "signed out, hours are added" });
    } else if (
      signin_time.isBetween(sevenam, sevenpm) &&
      signout_time.isBetween(sevenam, sevenpm)
    ) {
      const timedif = signout_time.diff(signin_time);
      const tempTime = moment.duration(timedif);
      const timeSpent =
        tempTime.hours() + ":" + tempTime.minutes() + ":" + tempTime.seconds();

      if (user.total_hours_attended == "0") {
        const time_addition = sumTime(timeSpent, "00:00:00");
        user.total_hours_attended = time_addition;
      } else {
        const time_addition = sumTime(timeSpent, user.total_hours_attended);
        user.total_hours_attended = time_addition;
      }

      res.json({ msg: "signed out, hours are added" });
    } else if (
      signin_time.isBetween(sevenam, sevenpm) &&
      signout_time.isAfter(sevenpm)
    ) {
      const timedif = sevenpm.diff(signin_time);
      const tempTime = moment.duration(timedif);
      const timeSpent =
        tempTime.hours() + ":" + tempTime.minutes() + ":" + tempTime.seconds();
      if (user.total_hours_attended == "0") {
        const time_addition = sumTime(timeSpent, "00:00:00");
        user.total_hours_attended = time_addition;
      } else {
        const time_addition = sumTime(timeSpent, user.total_hours_attended);
        user.total_hours_attended = time_addition;
      }
      res.json({ msg: "signed out, hours are added" });
    } else {
      res.json({ msg: "signed out, No hours are added" });
    }
    user.save();
  } catch (error) {
    res.json({ error: error.message });
  }
};

function sumTime(t1, t2, array = []) {
  var times = [3600, 60, 1],
    sum = [t1, t2, ...array]
      .map((s) => s.split(":").reduce((s, v, i) => s + times[i] * v, 0))
      .reduce((a, b) => a + b, 0);

  return times
    .map((t) => [Math.floor(sum / t), (sum %= t)][0])
    .map((v) => v.toString().padStart(2, 0))
    .join(":");
}
exports.login = login;
exports.logout = logout;
exports.viewMyProfile = viewMyProfile;
exports.viewMissingDays = viewMissingDays;
exports.resetPassword = resetPassword;
exports.viewAttendanceRecord = viewAttendanceRecord;
exports.view_hours = view_hours;
exports.updateMyProfile = updateMyProfile;
exports.signin = signin;
exports.signout = signout;