/** @format */

var isRealString = (str) => {
    return typeof str.trim() === "string" && str.trim().length > 0;
};

module.exports = { isRealString };