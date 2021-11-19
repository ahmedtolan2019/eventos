import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Toast } from "./Toast";

const CANCEL_BOOKING = gql`
  mutation cancelBookingMut($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      _id
      title
    }
  }
`;

export const BookingRow = ({ boEvent, bookedId, refetch }) => {
  const [eventBookedCancelSuccess, setEventBookedCancelSuccess] =
    useState(false);
  const [eventBookedCancelError, setEventBookedCancelError] = useState(false);
  const [canceld, setCanceld] = useState(false);

  const [cancelBookEvent, { loading: loadingCancel, error: errorCancel }] =
    useMutation(CANCEL_BOOKING, {
      onCompleted: () => {
        setEventBookedCancelSuccess(true);
        setTimeout(() => {
          setEventBookedCancelSuccess(false);
          setCanceld(true);
          refetch();
        }, 2000);
      },
      onError: (error) => {
        setEventBookedCancelError(true);
        setTimeout(() => {
          setEventBookedCancelError(false);
        }, 2000);
      },
      fetchPolicy: "network-only",
    });
  if (canceld) return null;
  return (
    <>
      {eventBookedCancelSuccess && (
        <Toast
          mode="success"
          heading="Succesfully Canceld!"
          text={`${boEvent.title} has been Canceld Booking!`}
        />
      )}
      {eventBookedCancelError && (
        <Toast mode="error" heading="Error" text={`${errorCancel.message}`} />
      )}
      <div className="flex  justify-between items-center text-gray-700 w-full gap-x-4 md:gap-x-16 lg:gap-x-32 border rounded-md bg-gray-50  shadow-sm transition-shadow ease-in-out  hover:shadow-lg p-2 ">
        <Link
          to={`/events/${boEvent._id}`}
          className="font-bold truncate hover:text-blue-500"
        >
          {boEvent.title}
        </Link>
        <p className="">${boEvent.price}</p>
        <p className="truncate">{boEvent.date.split("T")[0]}</p>
        <p className="truncate">{boEvent.noOfBookings} atens</p>
        <button
          onClick={() =>
            cancelBookEvent({
              variables: {
                bookingId: bookedId,
              },
            })
          }
        >
          {!loadingCancel && (
            <div className="flex items-center text-sm gap-x-1 text-red-400 text- bg-red-50 rounded-md p-1 cursor-pointer hover:bg-red-100 hover:text-red-600 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Cancel</p>
            </div>
          )}
          {loadingCancel && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
            </div>
          )}
        </button>
      </div>
    </>
  );
};
