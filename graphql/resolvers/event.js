const Event = require("../../models/event.js");
const User = require("../../models/user.js");
const Booking = require("../../models/booking");
const { tranformEvent } = require("../../helpers/resolversHelpers.js");

module.exports = {
  events: async (args) => {
    try {
      //No. of attendaces =>> no of bookings

      if (args.creatorId && args.creatorId !== null) {
        const createdEvents = await Event.find({ creator: args.creatorId });
        return createdEvents.map((event) => {
          return tranformEvent(event);
        });
      }
      const events = await Event.find();
      if (args.size !== -1) {
        return events.slice(0, args.size - 1).map((event) => {
          return tranformEvent(event);
        });
      } else {
        return events.map((event) => {
          return tranformEvent(event);
        });
      }
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args, { req }) => {
    if (!req.isAuth || req.isAuth === "" || req.isAuth === false) {
      throw new Error("unAuthenticated...!");
    }
    try {
      const event = await new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: req.userId,
      });

      await event.save();

      let creatorUser = await User.findById(event.creator);
      if (!creatorUser) {
        throw new Error("User cannot be found");
      }

      await creatorUser.createdEvents.push(event);
      await creatorUser.save();

      return tranformEvent(event);
    } catch (error) {
      throw error;
    }
  },
  editEvent: async (args, { req }) => {
    if (!req.isAuth || req.isAuth === "" || req.isAuth === false) {
      throw new Error("unAuthenticated...!");
    }

    try {
      const foundEvent = await Event.findById(args.eventInput.eventId);

      let creatorUser = await User.findById(foundEvent.creator);
      if (!creatorUser) {
        throw new Error("User cannot be found !");
      }
      let signedUserId = req.userId;
      if (!signedUserId) {
        throw new Error("you are not signed in !");
      }
      if (creatorUser.id !== signedUserId) {
        throw new Error("you are not the Event Creator !");
      }

      await Event.updateOne(
        { _id: args.eventInput.eventId },
        {
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: args.eventInput.price,
          date: new Date(args.eventInput.date),
        }
      );
      console.log(foundEvent.id);
      return {
        eventId: foundEvent.id,
        updatedAt: new Date().toISOString(),
        message: `${foundEvent._doc.title} has been updated!`,
      };
    } catch (error) {
      throw error;
    }
  },
  event: async (args, { req }) => {
    if (!req.isAuth || req.isAuth === "" || req.isAuth === false) {
      throw new Error("unAuthenticated...!");
    }
    try {
      const foundEvent = await Event.findById(args.eventId);
      if (!foundEvent) {
        throw new Error("Event Not Found");
      }

      return tranformEvent(foundEvent);
    } catch (error) {
      throw error;
    }
  },
  deleteEvent: async (args, { req }) => {
    if (!req.isAuth || req.isAuth === "" || req.isAuth === false) {
      throw new Error("unAuthenticated...!");
    }
    try {
      const foundEvent = await Event.findById(args.eventId);
      if (!foundEvent) {
        throw new Error("Event Not Found");
      }
      let creatorUser = await User.findById(foundEvent.creator);
      if (!creatorUser) {
        throw new Error("User cannot be found !");
      }
      let signedUserId = req.userId;
      if (!signedUserId) {
        throw new Error("you are not signed in !");
      }
      if (creatorUser.id !== signedUserId) {
        throw new Error("you are not the Event Creator !");
      }

      await Booking.deleteOne({ event: foundEvent.id });
      await Event.deleteOne({ _id: args.eventId });
      return {
        eventId: foundEvent.id,
        message: `${foundEvent.title} has been deleted!`,
        deletedAt: new Date(),
      };
    } catch (error) {
      throw error;
    }
  },
};
