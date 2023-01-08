// const { json } = require("body-parser");
require("dotenv").config();

let { EVENT_ID } = require("../constans");
const { addToCallendar } = require("../services/callendar");
// const { tryWrapper } = require("../helpers");
const { getDealById } = require("../services/dealServices");

const listeningEvents =  (req, res) => {
  const { ts, event } = req.body;
  const idDeal = req.body["data[FIELDS][ID]"];
  EVENT_ID = [...EVENT_ID, Number(ts)];
  console.log("🚀 EVENT_ID", EVENT_ID);

  const dealData =  getDealById(Number(idDeal));

  const dates = dealData[process.env.ARR_PAY_DATE];
  const approve = dealData[process.env.APPROVE_TO_CALENDAR];
  const count = dealData[process.env.COUNT_PAYMANT];
  const name = dealData["TITLE"];

  if (approve && dates.length > 0) {
    addToCallendar({ dates, count, approve, name, idDeal }).then(() => {
      res.send("ok");
    });
  } else {
    res.send("not");
  }
};

module.exports = { listeningEvents };
