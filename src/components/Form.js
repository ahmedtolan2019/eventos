import React, { useState } from "react";

export const Form = ({ fields, btnLabel, handleClick }) => {
  const [formData, setFormData] = useState({});
  let formSavedData = null;
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <div className="flex flex-col gap-3   text-gray-500">
      <form
        className="flex flex-col gap-3   text-gray-500 "
        onSubmit={(e) => {
          e.preventDefault();

          const stateFormData = {
            ...formData,
          };
          formSavedData && formSavedData !== null && formSavedData !== ""
            ? handleClick({
                ...formSavedData,
                // date: new Date(formSavedData.date),
                ...stateFormData,
              })
            : handleClick({
                ...stateFormData,
              });
          // handleClick({
          //   ...formSavedData,
          //   date: new Date(formSavedData.date),
          //   ...formData,
          // });
          // handleClick(
          //   formSavedData && formSavedData !== null && formSavedData !== ""
          //     ? { ...formSavedData, date: new Date(formSavedData.date) }
          //     : formData
          // );
        }}
      >
        {fields?.map((field) => {
          if (field.value && field.value !== null) {
            formSavedData = {
              ...formSavedData,
              [field.name]: field.value,
            };
          }
          if (field.type !== "textarea") {
            return (
              <React.Fragment key={field.name}>
                <label htmlFor="">{field.label}</label>
                <input
                  className="border-2 border-gray-400 h-12 text-2xl px-4 text-gray-700 focus:outline-none focus:ring-2 ring-gray-200 ring-offset-2"
                  type={field.type}
                  name={field.name}
                  required={true}
                  pattern={
                    field.type === "text" && "(([a-z]{1,})( {1})([a-z]{1,}))+"
                  }
                  title="Must be valid, understandable text!"
                  value={
                    formData[field.name]
                      ? formData[field.name]
                      : field.value || ""
                  }
                  onChange={handleChange}
                />
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={field.name}>
                <label htmlFor="">{field.label}</label>
                <textarea
                  required={true}
                  className="border-2 border-gray-400 h-12 text-2xl px-4 text-gray-700 focus:outline-none focus:ring-2 ring-gray-200 ring-offset-2"
                  rows="6"
                  name={field.name}
                  value={
                    formData[field.name]
                      ? formData[field.name]
                      : field.value || ""
                  }
                  onChange={handleChange}
                />
              </React.Fragment>
            );
          }
        })}
        <button className="btn" type="submit">
          {btnLabel}
        </button>
      </form>
    </div>
  );
};
