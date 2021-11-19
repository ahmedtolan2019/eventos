import React, { useState } from "react";
import { Form } from "./../../components/Form";
import { useHistory } from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Loader } from "../../components/Loader";
import { useLocalStorage } from "./../../utilities/useLocalStorage";

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

const CREATE_EVENT = gql`
  mutation createEventMut(
    $title: String!
    $description: String!
    $price: Float!
    $date: String!
  ) {
    createEvent(
      eventInput: {
        title: $title
        description: $description
        price: $price
        date: $date
      }
    ) {
      _id
      title
    }
  }
`;

export const CreateEvent = () => {
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const [homeFormData, setHomeFormData] = useLocalStorage("homeFormData");
  const [createEvent, { data, loading, error }] = useMutation(CREATE_EVENT, {
    onCompleted: () => {
      setRedirect(true);
      setHomeFormData({});
      setTimeout(() => {
        history.push("/dashboard/createdevents");
      }, 3000);
    },
  });

  if (loading) return <Loader />;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="flex flex-col gap-y-4 mt-32 justify-center items-center">
      {redirect && (
        <div className="flex p-2 px-4 border border-green-200 rounded bg-green-100 text-green-500 self-center justify-center flex-grow">
          <span className="font-bold mr-1 ">{data?.createEvent.title} </span>{" "}
          event has been created! redirecting...
        </div>
      )}
      {!redirect && (
        <Form
          fields={
            homeFormData !== null
              ? FormFields.map((field) => {
                  return {
                    ...field,
                    value:
                      field.name === "date"
                        ? homeFormData[field.name]
                        : homeFormData[field.name],
                  };
                })
              : FormFields
          }
          btnLabel="CREATE EVENT"
          handleClick={(formData) => {
            const event = {
              ...formData,
              date: formData.date,
            };
            createEvent({
              variables: {
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
