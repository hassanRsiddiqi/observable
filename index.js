require("@babel/register")({
  presets: [
    require.resolve("@babel/preset-env"),
    require.resolve("@babel/preset-react"),
  ],
  plugins: [
    [require.resolve("@babel/plugin-proposal-decorators"), { legacy: true }],
    [
      require.resolve("@babel/plugin-proposal-class-properties"),
      { loose: true },
    ],
  ],
  ignore: [/node_modules/],
});
console.log("Hassan");
const path = require("path");
const express = require("express");
require("@babel/polyfill");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { default: apiRoutes } = require("./routes/api");
const { default: clientRenderer } = require("./clientRender");

const PORT = process.env.PORT || 3001;

const app = express();
console.log("Express");
app.use("/static", express.static(path.resolve(__dirname, "..", "build")));
app.use(
  "/images",
  express.static(path.resolve(__dirname, "..", "build/images"))
);
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(cookieParser("ASecR3t@"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);
app.use("/", clientRenderer);

app.use("/static", express.static("build"));

app.listen(PORT, () => {
  //var server = //User server for sockets mayb
  console.log(`App listening on port ${PORT}!`);
});

app.on("error", onError);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
