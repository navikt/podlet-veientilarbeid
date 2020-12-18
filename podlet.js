const express = require("express");
const Podlet = require("@podium/podlet");
const fs = require("fs");
const promClient = require("prom-client");
const PrometheusConsumer = require("@metrics/prometheus-consumer");

const basePath = process.env.BASE_PATH || "/arbeid/podlet-veientilarbeid";
const port = process.env.PORT || 7100;
const podletVersion = process.env.VERSION_HASH || `${new Date().getTime()}`;
const isDevelopmentEnv = true;

const podletName = "podlet-veientilarbeid";

let rawdata = fs.readFileSync("build/asset-manifest.json");
let assets = JSON.parse(rawdata);

const podlet = new Podlet({
  name: podletName,
  version: podletVersion,
  pathname: basePath,
  fallback: "/fallback",
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

// Set up prometheus client with podium metrics
promClient.collectDefaultMetrics();
const metricsConsumer = new PrometheusConsumer({ client: promClient });
metricsConsumer.on("error", (err) => console.error(err));
podlet.metrics.pipe(metricsConsumer);

// Express setup
const app = express();

app.use(podlet.middleware());
app.use("/static", express.static("./build/static"));
app.use("/assets", express.static("./build/"));
app.use(`${basePath}/static`, express.static("./build/static"));
app.use(`${basePath}/assets`, express.static("./build/"));

app.get(`${basePath}${podlet.proxy({ target: "/api", name: "api" })}`, (req, res) => {
  res.status(200).send({ resultat: "flott resultat med basepath" });
});

podlet.proxy({ target: "https://innloggingsstatus.dev.nav.no/person/innloggingsstatus/auth", name: "authapi" });
podlet.proxy({ target: "https://github.com/status", name: "openapi" });

app.get(`${basePath}${podlet.content()}`, (req, res) => {
  res.status(200).podiumSend(`<div id="${podletName}"></div>`);
});

app.get(`${basePath}${podlet.fallback()}`, (req, res) => {
  res.status(200).podiumSend(`<div>Fallback for ${podletName}:${podletVersion}</div>`);
});

// generate the podlet manifest
app.get(`${basePath}${podlet.manifest()}`, (req, res) => {
  res.status(200).send(podlet);
});

// Prometheus metrics
app.get("/metrics", async function (req, res) {
  const metrics = await metricsConsumer.metrics();
  res.set("Content-Type", metricsConsumer.contentType()).send(metrics);
});

// isAlive/isReady route for Nais
app.get(`${basePath}/isAlive|isReady`, (req, res) => res.sendStatus(200));

console.log(JSON.stringify(podlet, undefined, 2));
console.log(`Content path ${podlet.content()}`);
console.log(`Manifest path ${podlet.manifest()}`);
console.log(`Starting on port ${port} with basePath ${basePath}`);
app.listen(port);
