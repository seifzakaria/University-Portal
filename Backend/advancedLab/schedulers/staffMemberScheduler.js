const schedule = require("node-schedule");
const hrMembers = require("../models/hrMembers.model");
const academicMembers = require("../models/academicMembers.model");
const moment = require("moment");
const requestsModel = require("../models/requests.model");

const everyMonth = schedule.scheduleJob("0 0 11 * *", () => {
  academicMembers
    .updateMany(
      {},
      {
        $inc: { annual_leave_balance: 2 },
        missing_days: [],
        total_hours_attended: "0",
        number_of_days_to_attend: 0,
      }
    )
    .exec();
  hrMembers
    .updateMany(
      {},
      {
        $inc: { annual_leave_balance: 2 },
        missing_days: [],
        total_hours_attended: "0",
        number_of_days_to_attend: 0,
      }
    )
    .exec();
});

const everyDay = schedule.scheduleJob("0 7 * * *", async () => {
  const today = moment();
  const hrUsers = await hrMembers.find({}).exec();
  const academicUsers = await academicMembers.find({}).exec();
  for (let i = 0; i < hrUsers.length; i++) {
    const user = hrUsers[i];
    const sign_ins = user.sign_in;
    const sign_outs = user.sign_out;
    if (sign_ins.length == 0 && today.day() != getWeekdayNumber(user.day_off)) {
      user.missing_days.push(today);
    }
    if (sign_ins.length != 0) {
      let lastSignin = moment(sign_ins[sign_ins.length - 1]);

      if (
        lastSignin.isSame(today, "day") == false &&
        getWeekdayNumber(user.day_off) != today.day()
      ) {
        user.missing_days.push(today);
      } else if (sign_ins.length == sign_outs.length) {
        let lastSignout = moment(sign_outs[sign_outs.length - 1]);
        if (
          lastSignin.isBefore(moment("7:00am", "h:mma")) &&
          lastSignout.isBefore(moment("7:00am", "h:mma")) &&
          getWeekdayNumber(user.day_off) != today.day()
        ) {
          user.missing_days.push(today);
        }
      }
    }
    user.save();
  }
  for (let i = 0; i < academicUsers.length; i++) {
    const user = academicUsers[i];
    const sign_ins = user.sign_in;
    const sign_outs = user.sign_out;
    if (sign_ins.length == 0 && today.day() != getWeekdayNumber(user.day_off)) {
      user.missing_days.push(today);
    }
    if (sign_ins.length != 0) {
      let lastSignin = moment(sign_ins[sign_ins.length - 1]);

      if (
        lastSignin.isSame(today, "day") == false &&
        getWeekdayNumber(user.day_off) != today.day()
      ) {
        user.missing_days.push(today);
      } else if (sign_ins.length == sign_outs.length) {
        let lastSignout = moment(sign_outs[sign_outs.length - 1]);
        if (
          lastSignin.isBefore(moment("7:00am", "h:mma")) &&
          lastSignout.isBefore(moment("7:00am", "h:mma")) &&
          getWeekdayNumber(user.day_off) != today.day()
        ) {
          user.missing_days.push(today);
        }
      }
    }
    user.save();
  }
});

const everyDayat12 = schedule.scheduleJob("1 0 * * *", async () => {
  const hrUsers = await hrMembers.find({}).exec();
  const academicUsers = await academicMembers.find({}).exec();
  const today = moment();
  for (let i = 0; i < hrUsers.length; i++) {
    const user = hrUsers[i];
    if (getWeekdayNumber(user.day_off) != today.day()) {
      user.number_of_days_to_attend = user.number_of_days_to_attend + 1;
    }
  }
});
function getWeekdayNumber(weekday) {
  if (weekday == "Sunday") {
    return 0;
  }
  if (weekday == "Monday") {
    return 1;
  }
  if (weekday == "Tuesday") {
    return 2;
  }
  if (weekday == "Wednesday") {
    return 3;
  }
  if (weekday == "Thursday") {
    return 4;
  }
  if (weekday == "Friday") {
    return 5;
  }
  if (weekday == "Saturday") {
    return 6;
  }
}
exports.everyMonth = everyMonth;
exports.everyDay = everyDay;
exports.everyDayat12 = everyDayat12;