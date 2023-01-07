var express = require("express");
var cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

var app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const dealRouter = require("./src/routes/deal");
const { errorHandler } = require("./src/helpers");
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());
// const bodyParser = require('body-parser');
// app.use(bodyParser);

app.use(logger(formatsLogger));

app.use("/api/", dealRouter);
// app.use('/api/contacts', tryWrapper(auth), contactsRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Routs not found" });
});

app.use(errorHandler);
//Connect to the database before listening

app.listen(process.env.PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
