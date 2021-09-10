import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";

import "./App.scss";
import AppLayout from "./layout";
import configureStore from "./store";

const LoginComponent = lazy(() => import("./pages/login"));
const RegisterComponent = lazy(() => import("./pages/register"));
const DashboardComponent = lazy(() => import("./pages/dashboard"));
const EventFormComponent = lazy(() => import("./pages/EventForm"));

function App() {
  return (
    <div className="App">
      <Provider store={configureStore}>
        <Suspense fallback={<p>Loading...</p>}>
          <Router>
            <Switch>
              <Route path="/" exact>
                <LoginComponent />
              </Route>
              <Route exact path="/login">
                <LoginComponent />
              </Route>
              <Route exact path="/register">
                <RegisterComponent />
              </Route>
              <Route exact path="/dashboard">
                <AppLayout>
                  <DashboardComponent />
                </AppLayout>
              </Route>
              <Route exact path="/add-events">
                <AppLayout>
                  <EventFormComponent />
                </AppLayout>
              </Route>
            </Switch>
          </Router>
        </Suspense>
      </Provider>
    </div>
  );
}

export default App;
