const userResolvers = require("./user.js");
const eventResolvers = require("./event.js");
const bookingResolvers = require("./booking.js");

module.exports = {
  ...userResolvers,
  ...eventResolvers,
  ...bookingResolvers,
};
