import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AuthenticatedApp from "./AuthApp";
import UnauthenticatedApp from "./UnAuthApp";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { ApolloConsumer } from "@apollo/client";
import { AuthContext, AuthProvider } from "./features/authContext";

//========using headers method =======================
// const UnAuthclient = new ApolloClient({
//   uri: "/graphql",
//   cache: new InMemoryCache(),
// });

// let Bearertoken = "";
//auth apollo
// const httpLink = createHttpLink({
//   uri: "/graphql",
// });
// const authLink = setContext((_, { headers }) => {

//   return {
//     headers: {
//       ...headers,
//       Authorization: `Bearer ${Bearertoken}`,
//     },
//   };
// });

// const AuthClient = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// const persistor = persistStore(store);
// const App = () => {
//   const dispatch = useDispatch();
//   dispatch(addPersistorToPurge(persistor));
//   const { isAuth, user } = useSelector((state) => state.auth);
//   Bearertoken = user.token;
//   return isAuth && user?.token && user?.id ? (
//     <ApolloProvider client={AuthClient}>
//       <AuthenticatedApp />
//     </ApolloProvider>
//   ) : (
//     <ApolloProvider client={UnAuthclient}>
//       <UnauthenticatedApp />
//     </ApolloProvider>
//   );
// };

//=================using httponly====================
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated() ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider apolloClient={client}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
