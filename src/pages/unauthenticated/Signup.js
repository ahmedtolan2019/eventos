import React from "react";
import { Form } from "../../components/Form";
import { NavLink } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Loader } from "../../components/Loader";
import { UnAuthHeader } from "./../../components/UnAuthHeader";

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

const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      _id
      email
    }
  }
`;
export const Signup = ({ history }) => {
  const [signUpMut, { data, loading, error }] = useMutation(SIGN_UP, {
    onError: () => {
      console.log("Error");
    },
    onCompleted: () => {
      history.push("/login");
    },
  });
  const handleSignup = (formData) => {
    signUpMut({
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

        <div className="max-w-xl mx-auto mt-24">
          {loading && <Loader />}
          {error && (
            <p className="text-center w-full px-10 rounded bg-red-100 text-red-500">
              Faild to Sign Up, try again later!
            </p>
          )}

          <Form
            fields={FormFields}
            btnLabel="SIGN UP"
            handleClick={handleSignup}
          />
          <p className="mt-4 text-center">
            Already sign up?
            <NavLink to="/login" className="text-blue-600">
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
