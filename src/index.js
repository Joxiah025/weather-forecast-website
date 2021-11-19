import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles/css/styles.css";
// import "./styles/css/open-weather-icons.css";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
