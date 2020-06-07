/** @format */

var isRealString = (str) => {
    if (str) {
        return typeof str.trim() === "string" && str.trim().length > 0;
    }
};

module.exports = { isRealString };