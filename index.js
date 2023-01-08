var express = require("express");
var cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

var app = express();
var bodyParser = require("body-parser");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const listenEvent = require("./src/routes/events");
const { errorHandler } = require("./src/helpers");
const { storage } = require("./src/helpers/storage");
const PORT = process.env.PORT || 80;

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
// app.use(bodyParser.json())

app.use(logger(formatsLogger));

app.use("/api/", listenEvent);
// app.use('/api/contacts', tryWrapper(auth), contactsRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Routs not found" });
});

app.use(errorHandler);
//Connect to the database before listening
storage.init().then(() => {
  app.listen(process.env.PORT, function () {
    console.log(`CORS-enabled web server listening on port ${PORT}`);
  });
});
