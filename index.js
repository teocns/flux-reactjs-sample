const express = require("express");

const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//const socketEnvironment = require("./socket");

const router = require("./router");
const app = express();
const port = 10202;

app.set("port", port);
var serverOptions = {
  key: fs.readFileSync("/etc/cloudflare/teocns.com.key"),
  cert: fs.readFileSync("/etc/cloudflare/teocns.com.pem"),
};

const server = https.createServer(serverOptions, app);

app.use(express.urlencoded({ limit: 10485760 }));
app.use(express.json({ limit: 10485760 }));

const configuration = [
  cookieParser(),
  // express.static('static'),
  cors({
    origin: true,
    credentials: true,
  }),
  ("/", router),
];

configuration.map((config) => {
  app.use(config);
});

console.log("Initialized bebee backend");

server.on("exit", () => {
  console.log("UNCAUGHT EXCEPTION");
});

server.listen(port, () => {
  console.log("server listening on port", port);
});
// socketEnvironment.initializeSocket(server).then(() => {
//   server.listen(port);
// });
