import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//pages
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import WorkerProfile from "./pages/workerprofile/WorkerProfile";
import Hire from "./pages/hire/hire";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/registro">
          <Signup />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/workerprofile/:uid">
          <WorkerProfile />
        </Route>

        <Route exact path="/hire/:uid">
          <Hire />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
