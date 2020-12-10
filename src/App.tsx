import React from "react";
import "./App.css";
import Panel from "nav-frontend-paneler";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";

function App() {
  function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 5) return "God natt";
    if (hour < 10) return "God morgen";
    if (hour < 12) return "God formiddag";
    if (hour < 18) return "God ettermiddag";
    if (hour < 22) return "God kveld";
    return "God natt";
  }

  return (
    <div className="podlet-veientilarbeid">
      <Panel border>
        <Systemtittel>{getGreeting()}</Systemtittel>
        <Normaltekst>Du har nå kommet deg inn i NAVs nye microfrontend.</Normaltekst>
      </Panel>
    </div>
  );
}

export default App;
