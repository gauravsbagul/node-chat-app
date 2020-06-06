/** @format */
const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime(),
  };
};
const generateLocationMessage = (from, latitude, longitude) => {
  console.log("TCL:: generateLocationMessage -> longitude", longitude);
  console.log("TCL:: generateLocationMessage -> latitude", latitude);
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
  };
};

module.exports = { generateMessage, generateLocationMessage };
