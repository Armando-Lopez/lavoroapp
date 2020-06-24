import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import WorkerProfile from "./pages/WorkerProfile";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>

        <Route exact path="/registro">
          <Signup />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/profile/:token">
          <WorkerProfile />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
