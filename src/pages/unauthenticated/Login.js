import React, { useContext, useState } from "react";
import { Form } from "../../components/Form";
import { NavLink } from "react-router-dom";
import { useLazyQuery, gql } from "@apollo/client";
import { Loader } from "../../components/Loader";
import { UnAuthHeader } from "./../../components/UnAuthHeader";
import { AuthContext } from "../../features/authContext";

const FormFields = [
  {
    label: "Email",
    type: "email",
    name: "email",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
  },
];

const LOGIN = gql`
  query getLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
      tokenExpiration
    }
  }
`;
export const Login = ({ history }) => {
  const { setAuthState } = useContext(AuthContext);

  const [redirect, setRedirect] = useState(false);
  const [getLogin, { data, loading, error }] = useLazyQuery(LOGIN, {
    onCompleted: () => {
      setRedirect(true);
      setTimeout(() => {
        setAuthState({
          userInfo: {
            userId: data.login.userId,
          },
          expiresAt: data.login.tokenExpiration,
        });
      }, 1000);
    },
  });

  const handleLogin = (formData) => {
    getLogin({
      variables: {
        email: formData.email,
        password: formData.password,
      },
    });
  };

  return (
    <div className="bg-gray-50">
      <div className="  h-screen px-4 sm:px-6 2xl:px-0 lg:max-w-7xl mx-auto">
        <UnAuthHeader />

        <div className="max-w-screen flex flex-col items-center justify-center mx-auto mt-24">
          <div className="w-100 mx-auto flex items-center">
            {loading && <Loader />}
            {error && (
              <p className="text-center w-full px-10 rounded bg-red-100 text-red-500">
                Credintials are wrong, try again!
              </p>
            )}
            {redirect && (
              <p className="text-center w-full px-10 rounded bg-green-100 text-green-500">
                Succesfull login!, redirecting..
              </p>
            )}
          </div>

          <Form
            fields={FormFields}
            btnLabel="LOG IN"
            handleClick={handleLogin}
          />
          <p className="mt-4 w-full text-center">
            Not signed up?{" "}
            <NavLink to="/signup" className="text-blue-600">
              Sign up now
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
