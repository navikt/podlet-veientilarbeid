import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SWRConfig } from "swr";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const element = document.getElementById("podlet-veientilarbeid");
if (element) {
  const authlevel = element.getAttribute("data-authlevel");

  ReactDOM.render(
    <React.StrictMode>
      <SWRConfig value={{ shouldRetryOnError: false }}>
        <App authlevel={authlevel} />
      </SWRConfig>
    </React.StrictMode>,
    element
  );
}
