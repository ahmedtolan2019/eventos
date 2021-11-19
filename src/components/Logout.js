import { ApolloConsumer } from "@apollo/client";
import React, { useContext } from "react";
import { AuthContext } from "../features/authContext";
export const Logout = () => {
  const { logout, setLogingOut, logingOut } = useContext(AuthContext);

  const userLogout = () => {
    setLogingOut(true);
    logout();
  };
  return (
    <button
      onClick={() => userLogout()}
      className="bg-red-200 text-red-700  w-full h-full px-4 py-1 rounded-sm"
    >
      {!logingOut && "Log out"}

      {logingOut && (
        <div class="flex justify-center items-center">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
        </div>
      )}
    </button>
  );
};
