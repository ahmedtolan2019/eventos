import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const DELETE_EVENT = gql`
  mutation deleteEventMut($eventId: ID!) {
    deleteEvent(eventId: $eventId) {
      message
      eventId
    }
  }
`;
export const EventRow = ({ createdEvent }) => {
  const history = useHistory();
  const [deleted, setDeleted] = useState(false);
  const [deleteEvent, { data, loading, error }] = useMutation(DELETE_EVENT, {
    onCompleted: () => {
      setDeleted(true);
    },
  });
  return (
    <div className="flex  justify-between text-gray-700  w-full gap-x-2 md:gap-x-16 lg:gap-x-32 border rounded-md bg-gray-50  shadow-sm transition-shadow ease-in-out  hover:shadow-lg p-2 ">
      {error && <p>Error deleting!</p>}
      {deleted && (
        <div className="w-full text-green-500">{data.deleteEvent.message}</div>
      )}
      {!deleted && (
        <>
          <Link
            to={`/events/${createdEvent._id}`}
            className="font-bold truncate hover:text-blue-500"
          >
            {createdEvent.title}
          </Link>
          <p className="">${createdEvent.price}</p>
          <p className="truncate w-32">{createdEvent.description}</p>
          <p className="truncate">{createdEvent.noOfBookings} atens</p>
          <div className="flex gap-x-4">
            <Link
              to={`/events/${createdEvent._id}/edit?title=${createdEvent.title}&description=${createdEvent.description}&price=${createdEvent.price}&date=${createdEvent.date}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </Link>
            <button
              onClick={() =>
                deleteEvent({
                  variables: {
                    eventId: createdEvent._id,
                  },
                })
              }
            >
              {!loading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
              {loading && (
                <div class="flex justify-center items-center">
                  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                </div>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
