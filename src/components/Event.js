import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Toast } from "./Toast";
import { AuthContext } from "../features/authContext";

const BOOK_EVENT = gql`
  mutation bookEventMut($eventId: ID!) {
    bookEvent(eventId: $eventId) {
      _id
      event {
        _id
        title
      }
    }
  }
`;
const CANCEL_BOOKING = gql`
  mutation cancelBookingMut($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      _id
      title
    }
  }
`;

export const Event = (props) => {
  return props.unAuth ? (
    <UnAuthEvent event={props.event} />
  ) : (
    <AuthEvent {...props} />
  );
};
export const AuthEvent = ({ event, booked, bookedId, refetch }) => {
  const [isBooked, setIsBooked] = useState(booked);
  const [eventBookedSuccess, setEventBookedSuccess] = useState(false);
  const [eventBookedError, setEventBookedError] = useState(false);
  const [eventBookedCancelSuccess, setEventBookedCancelSuccess] =
    useState(false);
  const [eventBookedCancelError, setEventBookedCancelError] = useState(false);

  // const isBooked = () => {
  //   console.log(bookingsEvents);
  //   if (bookingsEvents && bookingsEvents.bookings) {
  //     bookingsEvents.bookings.forEach((booking) => {
  //       if (booking.event._id === event._id) return true;
  //     });
  //   }
  //   return false;
  // };
  const [bookEvent, { loading, error }] = useMutation(BOOK_EVENT, {
    onCompleted: () => {
      setIsBooked(true);

      setEventBookedSuccess(true);
      setTimeout(() => {
        setEventBookedSuccess(false);
        refetch();
      }, 2000);
    },
    onError: (error) => {
      console.log(error);
      setEventBookedError(true);
      setTimeout(() => {
        setEventBookedError(false);
        refetch();
      }, 2000);
    },
    fetchPolicy: "network-only",
  });
  const [cancelBookEvent, { loading: loadingCancel, error: errorCancel }] =
    useMutation(CANCEL_BOOKING, {
      onCompleted: () => {
        setIsBooked(false);

        setEventBookedCancelSuccess(true);
        setTimeout(() => {
          setEventBookedCancelSuccess(false);
        }, 2000);
      },
      onError: (error) => {
        console.log(error);
        setEventBookedCancelError(true);
        setTimeout(() => {
          setEventBookedCancelError(false);
        }, 2000);
      },
      fetchPolicy: "network-only",
    });
  // if (error) console.log(error.networkError);

  return (
    <div className="flex bg-gray-50 shadow-lg flex-col py-8 px-6 space-y-4 border border-gray-300 rounded-xl w-full sm:w-80 ">
      {eventBookedSuccess && (
        <Toast
          mode="success"
          heading="Succesfully Booked!"
          text={`${event.title} has been Booked!`}
        />
      )}
      {eventBookedError && (
        <Toast mode="error" heading="Error" text={`${error.message}`} />
      )}
      {eventBookedCancelSuccess && (
        <Toast
          mode="success"
          heading="Succesfully Canceld!"
          text={`${event.title} has been Canceld Booking!`}
        />
      )}
      {eventBookedCancelError && (
        <Toast mode="error" heading="Error" text={`${errorCancel.message}`} />
      )}
      <div className="flex justify-between items-center ">
        <Link
          className="font-bold text-2xl truncate hover:text-blue-400"
          to={`/events/${event._id}`}
        >
          {event.title}
        </Link>
        <div className="flex  px-4 rounded-full border shadow-lg border-gray-500">
          <p className="font-bold text-lg">${event.price}</p>
        </div>
      </div>
      <div>
        <p className="text-gray-600 font-semibold text-base">
          {event.creator.email}
        </p>
        <p className="text-gray-600 font-normal text-sm">
          {new Date(event.date).toUTCString()}
        </p>
      </div>
      <div className="w-full ">
        <p className="text-sm">{event.description}</p>
      </div>
      <div className="w-full flex items-center justify-center ">
        {isBooked && (
          <button
            onClick={() =>
              cancelBookEvent({
                variables: {
                  bookingId: bookedId,
                },
              })
            }
            className="border rounded-full shadow-lg font-bold text-2xl px-6 py-2"
          >
            {!loadingCancel && "Cancel Booking"}
            {loadingCancel && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
              </div>
            )}
          </button>
        )}
        {!isBooked && (
          <button
            onClick={() =>
              bookEvent({
                variables: {
                  eventId: event._id,
                },
              })
            }
            className="border rounded-full shadow-lg font-bold text-2xl px-6 py-2"
          >
            {!loading && "Book Now"}
            {loading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
export const UnAuthEvent = ({ event }) => {
  const history = useHistory();
  return (
    <div className="flex bg-gray-50 shadow-lg flex-col py-8 px-6 space-y-4 border border-gray-300 rounded-xl w-full sm:w-80 ">
      <div className="flex justify-between items-center ">
        <Link
          className="font-bold text-2xl truncate hover:text-blue-400"
          to={`/login`}
        >
          {event.title}
        </Link>
        <div className="flex  px-4 rounded-full border shadow-lg border-gray-500">
          <p className="font-bold text-lg">${event.price}</p>
        </div>
      </div>
      <div>
        <p className="text-gray-600 font-semibold text-base">
          {event.creator.email.split("@")[0]}
        </p>
        <p className="text-gray-600 font-normal text-sm">
          {new Date(event.date).toUTCString()}
        </p>
      </div>
      <div className="w-full ">
        <p className="text-sm">{event.description}</p>
      </div>
      <div className="w-full flex items-center justify-center ">
        <button
          onClick={() => history.push("/login")}
          className="border rounded-full shadow-lg font-bold text-2xl px-6 py-2"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};
