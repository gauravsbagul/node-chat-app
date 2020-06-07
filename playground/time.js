/** @format */

//unix epic jan 1st 1970 00:00:00 am
const moment = require("moment");

var date = moment();
console.log("TCL:: date", date.add(100, "year").subtract(9, "months"));
// console.log("TCL:: date", date.format("MMM Do, YYYY mm:s:mm"));
