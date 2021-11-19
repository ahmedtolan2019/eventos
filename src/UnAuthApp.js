// import logo from "./logo.svg";
// import "./App.css";

import { UnAuthHome } from "./pages/unauthenticated/UnAuthHome";
import { Login } from "./pages/unauthenticated/Login";
import { Signup } from "./pages/unauthenticated/Signup";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function UnAuthApp() {
  return (
    <Router>
      <div className="App overflow-x-hidden">
        <Switch>
          {/* Home */}

          <Route
            path="/"
            exact={true}
            render={(routerProps) => <UnAuthHome {...routerProps} />}
          ></Route>
          {/* Login */}
          <Route
            path="/login"
            render={(routerProps) => <Login {...routerProps} />}
          ></Route>
          {/* sign up */}
          <Route
            path="/signup"
            render={(routerProps) => <Signup {...routerProps} />}
          ></Route>
          {/* All Events */}

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default UnAuthApp;
