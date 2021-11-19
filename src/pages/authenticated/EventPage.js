import React from "react";
import { useParams, Redirect, Link, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Loader } from "../../components/Loader";
import { EventRow } from "./../../components/EventRow";

const GET_EVENT_DETAILS = gql`
  query getevent($eventId: ID!) {
    event(eventId: $eventId) {
      _id
      title
      price
      description
      date
      creator {
        _id
        email
        createdEvents {
          _id
          title
          price
          description
          date
        }
      }
    }
  }
`;

export const EventPage = () => {
  const history = useHistory();
  const { eventId } = useParams();
  console.log(eventId);
  const { loading, error, data } = useQuery(GET_EVENT_DETAILS, {
    variables: {
      eventId: eventId,
    },
    fetchPolicy: "network-only",
  });

  if (loading) return <Loader />;
  if (error) return <Redirect to="/" />;
  console.log(data.event);
  let event = null;
  if (data && data !== null && data.event) {
    event = data.event;
    return (
      <>
        <div className="flex flex-col gap-y-4 md:gap-y-0 md:flex-row w-full flex-grow  pt-10">
          <div className="flex-grow border rounded p-2">
            <p className="font-bold text-3xl ">{event.title}</p>
            <p className="text-xs">
              {event.creator.email} . {event.date.split("T")[0]} . $
              {event.price} . at{" "}
              {event.date
                .split("T")[1]
                .slice(-event.date.split("T")[1].length, 5)}
            </p>
            <p className="text-base mt-10">{event.description}</p>
          </div>
          <div className="flex mt-10 md:mt-0 p-2 md:pt-0">
            <div className="flex flex-grow flex-col ">
              <h2 className="font-bold text-xl">More Event By</h2>
              <small className="mb-4">{event.creator.email}</small>
              <div className="flex flex-col  w-full flex-grow gap-y-2 mt-2">
                {event.creator.createdEvents.map((createdEvent, index) => {
                  if (index < 4)
                    return (
                      <div
                        key={createdEvent._id}
                        className="flex flex-col rounded border p-1"
                      >
                        <Link
                          className="font-bold hover:text-blue-400"
                          to={`/events/${createdEvent._id}`}
                        >
                          {createdEvent.title}
                        </Link>
                        <p className="">${createdEvent.price}</p>
                        <p className="">{createdEvent.date.split("T")[0]}</p>
                        <p className="truncate w-full md:w-36">
                          {createdEvent.description}
                        </p>
                      </div>
                    );
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else return <Redirect to="/" />;
};
