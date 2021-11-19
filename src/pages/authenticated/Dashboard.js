import React, { useContext } from "react";
import {
  NavLink,
  Switch,
  Route,
  Redirect,
  useParams,
  Link,
} from "react-router-dom";
import { BookingRow } from "../../components/BookingRow";
import { EventRow } from "./../../components/EventRow";

import { gql, useQuery } from "@apollo/client";

import { AuthContext } from "../../features/authContext";
import { Loader } from "./../../components/Loader";

const GET_EVENT_FOR_DASHBOARD_ROW = gql`
  query getEventRow($size: Int!, $creatorId: ID) {
    events(size: $size, creatorId: $creatorId) {
      _id
      title
      description
      price
      noOfBookings
      date
    }
  }
`;
const GET_BOOKINGS = gql`
  query getBookings($userId: ID!) {
    bookings(userId: $userId) {
      _id
      event {
        _id
        title
        price
        noOfBookings
        date
      }
    }
  }
`;

export const Dashboard = () => {
  const { authState } = useContext(AuthContext);

  const {
    loading: createdEventLoading,
    error: createdEventError,
    data: createdEvents,
  } = useQuery(GET_EVENT_FOR_DASHBOARD_ROW, {
    variables: {
      size: -1,
      creatorId: authState.userInfo.userId,
    },
    fetchPolicy: "network-only",
  });
  const {
    loading: bookingLoading,
    error: bookingError,
    data: bookingsEvents,
    refetch,
  } = useQuery(GET_BOOKINGS, {
    variables: {
      userId: authState.userInfo.userId,
    },
    fetchPolicy: "network-only",
  });
  if (createdEventLoading || bookingLoading) return <Loader />;
  // if (createdEventError || bookingError) return <Redirect to="/" />;
  if (createdEventError || bookingError)
    return (
      <p>
        {createdEventError?.message}
        {bookingError?.message}
      </p>
    );
  if (createdEvents && bookingsEvents)
    // if (createdEventLoading) return <Loader />;
    // if (createdEventError) return <Redirect to="/" />;
    // if (createdEvents)
    return (
      <div className="flex mt-8 flex-col max-w-full items-center">
        <div className="flex text-gray-800  gap-x-4 font-bold text-4xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>{" "}
          Dashboard
        </div>
        <div className="mt-10 flex w-full justify-center gap-x-10">
          <NavLink
            to="/dashboard/createdevents"
            activeClassName="dashboard-switch"
            className="text-gray-500 hover:text-black "
          >
            Created Events
          </NavLink>
          <div className="flex text-gray-500">|</div>
          <NavLink
            activeClassName="dashboard-switch"
            to="/dashboard/bookings"
            className="text-gray-500 hover:text-black "
          >
            Bookings
          </NavLink>
        </div>
        {/* Created Events */}

        <Switch>
          <Route path="/dashboard/createdevents">
            <div className="w-full self-center  ">
              <Link to="/events/create">
                <button className="mt-8  bg-gray-900 text-gray-100 rounded p-2 px-4 font-bold text-xl focus:ring ring-offset-2 ring-black">
                  Create Event
                </button>
              </Link>
            </div>
            <div className="w-full mt-8 flex flex-col gap-y-3">
              {createdEvents?.events.map((createdEvent) => (
                <EventRow key={createdEvent._id} createdEvent={createdEvent} />
              ))}
            </div>
          </Route>
          <Route path="/dashboard/bookings">
            <div className="w-full mt-8 flex flex-col gap-y-3">
              {bookingsEvents?.bookings.map((boEvent) => (
                <BookingRow
                  key={boEvent._id}
                  bookedId={boEvent._id}
                  boEvent={boEvent.event}
                  refetch={refetch}
                />
              ))}
            </div>
          </Route>
          <Redirect from="/dashboard" to="dashboard/createdevents" />
        </Switch>
      </div>
    );
};
