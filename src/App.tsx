import React, { useState } from "react";
import "./App.css";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import Panel from "nav-frontend-paneler";
import useInterval from "./hooks/useInterval";
import useSWR from "swr";
import { authUrl } from "./urls";

const fetcher = async (url: string) => {
  const response = await fetch(url, { method: "GET", credentials: "include" });
  const data = await response.json();
  return data;
};

interface AuthType {
  authenticated: boolean;
  name: string;
  securityLevel: "3" | "4";
}

function getAuthInfo(auth: AuthType | undefined) {
  if (!auth) return "ikke logget inn";
  switch (auth.securityLevel) {
    case "3":
      return "litt sikkert logget inn";
    case "4":
      return "helt sikkert logget inn";
    case undefined:
      return "egentlig ikke logget inn";
    default:
      return `logget inn på en merkelig måte (${auth.securityLevel})`;
  }
}

function App({ authlevel }: { authlevel: string | null }) {
  const { data } = useSWR<AuthType>(authUrl, fetcher);

  return (
    <div className="podlet-veientilarbeid">
      <div className="limit">
        <Panel border>
          <Greeting authInfo={getAuthInfo(data)} />
          <span>Nivå fra layout-server: {authlevel}</span>
        </Panel>
      </div>
    </div>
  );
}

function Greeting({ authInfo }: { authInfo: string }) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return (
    <>
      <Systemtittel>
        {getGreeting(currentTime)}! Du er {authInfo}.
      </Systemtittel>
      <Normaltekst>
        Klokken er nå <Clock currentTime={currentTime} />
      </Normaltekst>
    </>
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
