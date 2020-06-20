import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/registro">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
