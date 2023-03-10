var express = require("express");
var cors = require("cors");
const logger = require("morgan");
const events = require("./routes/events");
const { errorHandler } = require("./helpers");
var bodyParser = require("body-parser");
const { checkDublikat } = require("./midelware/checkDublikat");
const auth = require("./midelware/auth");
require("dotenv").config();


const app = express();


const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger(formatsLogger));

app.use("/api/", auth);
app.use("/api/", events);


app.use((req, res) => {
  res.status(404).json({ message: "Routs not found" });
});

app.use(errorHandler);
// app.listen(process.env.PORT, function () {
//   console.log(`CORS-enabled web server listening on port ${PORT}`);
// });

module.exports = { app };
