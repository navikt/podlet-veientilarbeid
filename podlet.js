const express = require("express");
const Podlet = require("@podium/podlet");
const fs = require("fs");

const basePath = process.env.BASE_PATH || "/arbeid/podlet-veientilarbeid";
const port = process.env.PORT || 7100;
const isDevelopmentEnv = true;

const podletName = "podlet-veientilarbeid";

let rawdata = fs.readFileSync("build/asset-manifest.json");
let assets = JSON.parse(rawdata);

const app = express();

const podlet = new Podlet({
  name: podletName,
  version: "1.0.0",
  pathname: "/",
  development: isDevelopmentEnv,
  logger: console,
});

assets.entrypoints.forEach((element, index) => {
  if (element.indexOf(".css") !== -1) {
    podlet.css({ value: `/${element}` });
  } else if (element.indexOf(".js") !== -1) {
    podlet.js({ value: `/${element}`, defer: true });
  }
});

app.use(podlet.middleware());
app.use(`${basePath}/static`, express.static("./build/static"));
app.use(`${basePath}/assets`, express.static("./build/"));

app.get(`${basePath}${podlet.content()}`, (req, res) => {
  res.status(200).podiumSend(`<div id="${podletName}"></div>`);
});

// generate the podlet manifest
app.get(`${basePath}${podlet.manifest()}`, (req, res) => {
  res.status(200).send(podlet);
});

// isAlive/isReady route for Nais
app.get(`${basePath}/isAlive|isReady`, (req, res) => res.sendStatus(200));

//start the app at port

console.log(JSON.stringify(podlet, undefined, 2));
console.log(`Content path ${podlet.content()}`);
console.log(`Manifest path ${podlet.manifest()}`);
console.log(`Starting on port ${port} with basePath ${basePath}`);
app.listen(port);
