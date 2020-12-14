import React, { useState } from "react";
import "./App.css";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import Panel from "nav-frontend-paneler";
import useInterval from "./hooks/useInterval";

function App() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return (
    <div className="podlet-veientilarbeid">
      <Panel border>
        <Systemtittel>{getGreeting(currentTime)}</Systemtittel>
        <Normaltekst>
          Klokken er nå <Clock currentTime={currentTime} />
        </Normaltekst>
      </Panel>
    </div>
  );
}

const getGreeting = (currentTime: Date) => {
  const hour = currentTime.getHours();

  if (hour < 5) return "God natt";
  if (hour < 10) return "God morgen";
  if (hour < 12) return "God formiddag";
  if (hour < 18) return "God ettermiddag";
  if (hour < 22) return "God kveld";
  return "God natt";
};

const Clock = ({ currentTime }: { currentTime: Date }) => {
  const formattedTime = [currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()].map(pad).join(":");

  return <span className={"podlet-veientilarbeid--currentTime"}>{formattedTime}</span>;
};

function pad(number: Number) {
  return number < 10 ? "0" + number : number.toString();
}

export default App;
