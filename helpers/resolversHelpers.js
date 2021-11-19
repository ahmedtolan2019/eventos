const Event = require("../models/event.js");
const User = require("../models/user.js");
const Booking = require("../models/booking.js");

const getNoOfBookings = async (eventId) => {
  try {
    return await Booking.countDocuments({
      event: eventId,
    });
  } catch (error) {
    throw error;
  }
};

const dateToString = (date) => {
  return new Date(date).toISOString();
};
const userById = async (userId) => {
  try {
    const foundUser = await User.findById(userId);
    return transformUser(foundUser);
  } catch (error) {
    throw error;
  }
};

const tranformEvent = (event) => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    _id: event.id, //event id is a string version of result._doc._id
    creator: userById.bind(this, event._doc.creator),

    noOfBookings: getNoOfBookings(event.id),
  };
};
const transformEvents = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return tranformEvent(event);
    });
  } catch (error) {
    throw error;
  }
};

const eventById = async (eventId) => {
  const foundEvent = await Event.findById(eventId);
  return tranformEvent(foundEvent);
};

const transformUser = (user) => {
  return {
    ...user._doc,
    password: null,
    _id: user.id,
    createdEvents: transformEvents.bind(this, user._doc.createdEvents),
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
    event: eventById.bind(this, booking._doc.event),
    user: userById.bind(this, booking._doc.user),
  };
};

module.exports = {
  dateToString,
  userById,
  tranformEvent,
  transformEvents,
  eventById,
  transformUser,
  transformBooking,
};
