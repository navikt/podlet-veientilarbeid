const express = require("express");
const Podlet = require("@podium/podlet");
const fs = require("fs");
const port = process.env.PORT || 7100;
const selfUrl = `http://localhost:${port}`;
const name = "veientilarbeid";
let rawdata = fs.readFileSync("build/asset-manifest.json");
let assets = JSON.parse(rawdata);

const app = express();

const podlet = new Podlet({
  name: name,
  version: "1.0.0",
  pathname: "/",
  development: true,
  logger: console,
});

assets.entrypoints.forEach((element, index) => {
  if (element.indexOf(".css") !== -1) {
    podlet.css({ value: `${selfUrl}/${element}` });
  } else if (element.indexOf(".js") !== -1) {
    podlet.js({ value: `${selfUrl}/${element}`, defer: true });
  }
});

app.use(podlet.middleware());
app.use("/static", express.static("./build/static"));
app.use("/assets", express.static("./build/"));

app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend(`<div id="${name}"></div>`);
});

// generate the podlet manifest
app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

// isAlive route
app.get("/isAlive", (req, res) => res.status(200).end());

// isReady route
app.get("/isReady", (req, res) => res.status(200).end());

//start the app at port
console.log(`Starting on port ${port}`);
app.listen(port);
