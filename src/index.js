import React from "react";
import ReactDOM from "react-dom";

//firebase config
import "./services/firebase/dbconfig";

//components
import App from "./App";

//styles
import "materialize-css/dist/css/materialize.css";
import "materialize-css/";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
