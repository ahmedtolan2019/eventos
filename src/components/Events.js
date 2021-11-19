import React, { useContext } from "react";
import { Event } from "./Event";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Loader } from "./Loader";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../features/authContext";

const GET_EVENTS = gql`
  query getEvents($size: Int!) {
    events(size: $size) {
      _id
      title
      description
      price
      creator {
        _id
        email
      }
      date
    }
  }
`;

const BOOKINGS = gql`
  query getBookings($userId: ID!) {
    bookings(userId: $userId) {
      _id
      user {
        _id
      }
      event {
        _id
      }
    }
  }
`;
export const Events = ({ all, unAuth }) => {
  return unAuth ? <UnAuthEvents /> : <AuthEvents all={all} />;
};

const AuthEvents = ({ all }) => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_EVENTS, {
    variables: {
      size: all ? -1 : 10,
    },
  });

  const {
    loading: bookingLoading,
    error: bookingError,
    data: bookingsEvents,
    refetch,
  } = useQuery(BOOKINGS, {
    variables: {
      userId: authState.userInfo.userId,
    },

    fetchPolicy: "network-only",
  });

  if (loading || bookingLoading)
    return (
      <div className="flex flex-wrap mt-32 gap-5 justify-center min-w-full  mx-auto">
        <Loader />
      </div>
    );
  if (error || bookingError)
    return (
      <div className="flex flex-wrap mt-32 gap-5 justify-center min-w-full  mx-auto">
        Error
      </div>
    );
  let BookedArray = [];
  let bookedId;

  BookedArray = bookingsEvents.bookings.map((booking) => booking.event._id);

  const getBookingIDFromEventId = (eventId) => {
    bookingsEvents.bookings.forEach((booking) => {
      if (booking.event._id === eventId) {
        bookedId = booking._id;
      }
    });

    return bookedId;
  };

  return (
    <div className="flex flex-wrap gap-5 justify-center min-w-full  mx-auto">
      {data?.events.map((event) => (
        <Event
          key={event._id}
          event={event}
          booked={BookedArray.includes(event._id)}
          bookedId={getBookingIDFromEventId(event._id)}
          refetch={refetch}
        />
      ))}
    </div>
  );
};
const UnAuthEvents = ({ all }) => {
  const { loading, error, data } = useQuery(GET_EVENTS, {
    variables: {
      size: all ? -1 : 10,
    },
  });

  if (loading)
    return (
      <div className="flex flex-wrap mt-32 gap-5 justify-center min-w-full  mx-auto">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="flex flex-wrap mt-32 gap-5 justify-center min-w-full  mx-auto">
        Error
      </div>
    );

  return (
    <div className="flex flex-wrap gap-5 justify-center min-w-full  mx-auto">
      {data?.events.map((event) => (
        <Event unAuth={true} key={event._id} event={event} />
      ))}
    </div>
  );
};
