import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const AuthContext = createContext();
const { Provider } = AuthContext;

const LOGOUT = gql`
  mutation logout {
    logout {
      message
    }
  }
`;
const AuthProvider = ({ children, apolloClient }) => {
  const history = useHistory();
  const [logingOut, setLogingOut] = useState(false);
  const [hitLogout, { data, loading, error }] = useMutation(LOGOUT, {
    onCompleted: () => {
      setLogingOut(false);
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expiresAt");
      setAuthState({});
    },
    onError: () => {
      setLogingOut(false);
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expiresAt");
      setAuthState({});
    },
  });
  const userInfo = localStorage.getItem("userInfo");
  const expiresAt = localStorage.getItem("expiresAt");

  const [authState, setAuthState] = useState({
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  });

  const setAuthInfo = ({ userInfo, expiresAt }) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiresAt", expiresAt);

    setAuthState({
      userInfo,
      expiresAt,
    });
  };

  const logout = async () => {
    try {
      await apolloClient.cache.reset();
      hitLogout();
    } catch (error) {
      console.log(error);
    }
  };

  const isAuthenticated = () => {
    if (!authState.expiresAt) {
      return false;
    }

    return new Date() < new Date(authState.expiresAt * 1000);
  };

  //   const isAdmin = () => {
  //     return authState.userInfo.role === 'admin';
  //   };

  //   const getAccessToken = () => {
  //     return localStorage.getItem('token');
  //   };

  //   const getNewToken = async () => {
  //     try {
  //       const { data } = await publicFetch.get(
  //         '/token/refresh'
  //       );
  //       setAuthState(
  //         Object.assign({}, authState, { token: data.token })
  //       );
  //     } catch (err) {
  //       return err;
  //     }
  //   };

  //   const getNewTokenForRequest = async failedRequest => {
  //     const { data } = await publicFetch.get(
  //       '/token/refresh'
  //     );

  //     failedRequest.response.config.headers[
  //       'Authorization'
  //     ] = `Bearer ${data.token}`;

  //     localStorage.setItem('token', data.token);

  //     return Promise.resolve();
  //   };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        logingOut,
        setLogingOut,
        // isAdmin,
        // getNewToken,
        // getAccessToken,
        // getNewTokenForRequest
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
