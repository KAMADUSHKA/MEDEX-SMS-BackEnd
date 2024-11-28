const app = require("./app");
const http = require("http");
const debug = require("debug")("node-angular");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val; // Named pipe
  }

  if (port >= 0) {
    return port; // Valid port number
  }

  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${port}`;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${port}`;
  debug(`Listening on ${bind}`);
};

const port = normalizePort(process.env.PORT || 3000); // Default to port 3000 if not provided
app.set("port", port);

const server = http.createServer(app);

server.on("error", onError);
server.on("listening", onListening);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
