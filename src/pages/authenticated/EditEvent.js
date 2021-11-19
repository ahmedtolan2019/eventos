import React, { useState } from "react";
import { Form } from "./../../components/Form";
import { useHistory, useParams } from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Loader } from "../../components/Loader";
import { useLocalStorage } from "./../../utilities/useLocalStorage";
import { useUrlQuery } from "./../../utilities/useUrlQuery";

const FormFields = [
  {
    label: "Event Title",
    type: "text",
    name: "title",
  },
  {
    label: "Ticket Price",
    type: "number",
    name: "price",
  },
  {
    label: "Event Date",
    type: "datetime-local",
    name: "date",
  },
  {
    label: "Description",
    type: "textarea",
    name: "description",
  },
];

const EDIT_EVENT = gql`
  mutation editEventMut(
    $eventId: ID!
    $title: String!
    $description: String!
    $price: Float!
    $date: String!
  ) {
    editEvent(
      eventInput: {
        eventId: $eventId
        title: $title
        description: $description
        price: $price
        date: $date
      }
    ) {
      message
      eventId
    }
  }
`;

export const EditEvent = () => {
  const history = useHistory();
  const { eventId } = useParams();
  const urlQuery = useUrlQuery();

  const [redirect, setRedirect] = useState(false);
  const [homeFormData, setHomeFormData] = useLocalStorage("homeFormData");
  const [editEvent, { data, loading, error }] = useMutation(EDIT_EVENT, {
    onCompleted: () => {
      setRedirect(true);
      setHomeFormData({});
      setTimeout(() => {
        history.push(`/events/${eventId}`);
      }, 3000);
    },
  });

  if (loading) return <Loader />;
  if (error) return <h1>{error.message}</h1>;
  let fildsValuesFromUrl = {};
  FormFields.forEach((field) => {
    if (field.name !== "date") {
      fildsValuesFromUrl[field.name] = urlQuery.get(field.name);
    } else {
      const fieldDate = new Date(urlQuery.get(field.name))
        .toISOString()
        .slice(0, 16);
      fildsValuesFromUrl["date"] = fieldDate;
    }
  });
  return (
    <div className="flex flex-col gap-y-4 mt-32 justify-center items-center">
      {redirect && (
        <div className="flex p-2 px-4 border border-green-200 rounded bg-green-100 text-green-500 self-center justify-center flex-grow">
          <span className="font-bold mr-1 ">{data?.editEvent.message} </span>{" "}
          redirecting...
        </div>
      )}
      {!redirect && (
        <Form
          fields={
            homeFormData !== null
              ? FormFields.map((field) => ({
                  ...field,
                  value: fildsValuesFromUrl[field.name],
                }))
              : FormFields
          }
          btnLabel="SAVE EVENT"
          handleClick={(formData) => {
            const event = {
              ...formData,
            };
            editEvent({
              variables: {
                eventId: eventId,
                title: event.title,
                description: event.description,
                price: parseFloat(event.price),
                date: event.date,
              },
              // variables: {
              //   title: event.title,
              //   description: event.description,
              //   price: event.price,
              //   date: event.date,
              // },
            });
          }}
        />
      )}
    </div>
  );
};
