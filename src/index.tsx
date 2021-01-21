import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SWRConfig } from "swr";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("podlet-veientilarbeid")
);
