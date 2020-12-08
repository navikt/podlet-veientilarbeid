import React from "react";
import "./App.css";
import Panel from "nav-frontend-paneler";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";

function App() {
  function greeting() {
    return new Date().getTime() > 12 ? "God ettermiddag" : "God formiddag";
  }

  return (
    <div className="podlet-veientilarbeid">
      <Panel border>
        <Systemtittel>{greeting()}</Systemtittel>
        <Normaltekst>Du har nå kommet deg inn i NAVs nye microfrontend.</Normaltekst>
      </Panel>
    </div>
  );
}

export default App;
