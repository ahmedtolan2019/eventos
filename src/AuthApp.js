// import logo from "./logo.svg";
// import "./App.css";

import { AllEvents } from "./pages/authenticated/AllEvents";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { Bookings } from "./pages/authenticated/Bookings";
import { AuthHome } from "./pages/authenticated/AuthHome";
import { AuthHeader } from "./components/AuthHeader";
import { Dashboard } from "./pages/authenticated/Dashboard";
import { CreateEvent } from "./pages/authenticated/CreateEvent";
import { EventPage } from "./pages/authenticated/EventPage";
import { EditEvent } from "./pages/authenticated/EditEvent";

const AppShell = ({ children }) => {
  return (
    <div className="bg-gray-50">
      <div className=" w-screen h-screen px-4 sm:px-6 2xl:px-0 lg:max-w-7xl mx-auto">
        <AuthHeader />
        {children}
      </div>
    </div>
  );
};
function AuthApp() {
  return (
    <Router>
      <div className="App overflow-x-hidden">
        {/* Home */}
        <Switch>
          <Route
            path="/"
            exact={true}
            render={(routerProps) => <AuthHome {...routerProps} />}
          ></Route>

          {/* All Events */}
          <Route
            path="/events"
            exact={true}
            render={(routerProps) => (
              <AppShell>
                <AllEvents {...routerProps} />
              </AppShell>
            )}
          ></Route>

          <Route
            path="/bookings"
            render={(routerProps) => (
              <AppShell>
                <Bookings {...routerProps} />
              </AppShell>
            )}
          ></Route>
          <Route
            path="/dashboard"
            render={(routerProps) => (
              <AppShell>
                <Dashboard {...routerProps} />
              </AppShell>
            )}
          ></Route>
          <Route
            path="/events/create"
            exact={true}
            render={(routerProps) => (
              <AppShell>
                <CreateEvent {...routerProps} />
              </AppShell>
            )}
          ></Route>

          <Route
            path="/events/:eventId"
            exact={true}
            render={(routerProps) => (
              <AppShell>
                <EventPage {...routerProps} />
              </AppShell>
            )}
          ></Route>
          <Route
            path="/events/:eventId/edit"
            exact={true}
            render={(routerProps) => (
              <AppShell>
                <EditEvent {...routerProps} />
              </AppShell>
            )}
          ></Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default AuthApp;
