import React, { useContext } from "react";
import { Event } from "./Event";
import { gql, useQuery } from "@apollo/client";
import { Loader } from "./Loader";
import { AuthContext } from "../features/authContext";

const GET_BOOKINGS = gql`
  query getBookings($userId: ID!) {
    bookings(userId: $userId) {
      _id
      event {
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
  }
`;

export const BookedEvents = () => {
  const { logout, authState } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_BOOKINGS, {
    variables: {
      userId: authState.userInfo.userId,
    },
    onError: () => {
      setTimeout(() => {
        logout();
      }, 1000);
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
        Error: {error.message}
      </div>
    );
  return (
    <div className="flex flex-wrap gap-5 justify-center min-w-full  mx-auto">
      {data?.bookings.map((event) => (
        <Event key={event._id} booked={true} event={event.event} />
      ))}
    </div>
  );
};
