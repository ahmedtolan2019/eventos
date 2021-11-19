import React from "react";

export const Loader = () => {
  return (
    <div className="text-gray-600 flex items-center justify-center max-w-full mx-auto ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin h-24 w-24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
};
