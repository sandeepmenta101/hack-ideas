import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';

import './App.scss';
import AppLayout from './layout';

const LoginComponent = lazy(() => import('./pages/login'));
const RegisterComponent = lazy(() => import('./pages/register'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<p>Loading...</p>}>
        <Router>
          <Switch>
          <Route path="/" exact><LoginComponent /></Route>
            <Route path="/login"><LoginComponent /></Route>
            <Route path="/register"><RegisterComponent /></Route>
            <Route exact path="/dashboard">
              <AppLayout />
            </Route>
            <Route exact path="/events">
              <AppLayout />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
