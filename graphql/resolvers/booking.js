const Booking = require("../../models/booking.js");
const Event = require("../../models/event.js");

const {
  eventById,
  transformBooking,
} = require("../../helpers/resolversHelpers.js");
const User = require("../../models/user.js");

module.exports = {
  bookings: async (args, { req }) => {
    if (!req.isAuth || req.isAuth === "" || req.isAuth === false) {
      throw new Error("unAuthenticated...!");
    }
    try {
      const bookingsUser = await User.findOne({ _id: args.userId });
      if (!bookingsUser) {
        throw new Error("User Not Found!");
      }
      const bookings = await Booking.find({ user: bookingsUser });
      // console.log(bookings);
      // if (!bookings || bookings.length === 0) {
      //   throw new Error("There are no bookings!");
      // }
      // console.log("booking");
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args, { req }) => {
    if (!req.isAuth || req.isAuth === "" || req.isAuth === false) {
      throw new Error("unAuthenticated...!");
    }
    try {
      const foundEvent = await Event.findById(args.eventId);
      if (!foundEvent) {
        throw new Error("Event not found!");
      }
      const foundBooking = await Booking.findOne({
        event: args.eventId,
        user: req.userId,
      });
      if (foundBooking) {
        throw new Error("You've already booked this event");
      }

      const booking = await new Booking({
        event: args.eventId,
        user: req.userId,
      });

      await booking.save();
      return transformBooking(booking);
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args, { req }) => {
    if (!req.isAuth || req.isAuth === "" || req.isAuth === false) {
      throw new Error("unAuthenticated...!");
    }
    try {
      console.log(args.bookingId);
      const deletedBooking = await Booking.findById(args.bookingId);

      if (!deletedBooking) {
        throw new Error("Booking not found!");
      }

      let creatorUser = await User.findById(deletedBooking.user);
      if (!creatorUser) {
        throw new Error("User cannot be found !");
      }
      let signedUserId = req.userId;
      if (!signedUserId) {
        throw new Error("you are not signed in !");
      }
      if (creatorUser.id !== signedUserId) {
        throw new Error("you are not the Booking Creator !");
      }

      await Booking.deleteOne({ _id: args.bookingId });
      return eventById(deletedBooking.event);
    } catch (error) {
      throw error;
    }
  },
};
