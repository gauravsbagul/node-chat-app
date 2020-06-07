/** @format */

const moment = require("moment");
const generateMessage = (from, text) => {
    console.log("TCL:: generateMessage -> text", text);
    console.log("TCL:: generateMessage -> from", from);
    return {
        from,
        text,
        createdAt: moment().valueOf(),
    };
};
const generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf(),
    };
};

module.exports = { generateMessage, generateLocationMessage };