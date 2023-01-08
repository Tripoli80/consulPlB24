// const { json } = require("body-parser");
require("dotenv").config();

 let { EVENT_ID } = require("../constans");
const { addToCallendar } = require("../services/callendar");
// const { tryWrapper } = require("../helpers");
const { getDealById } = require("../services/dealServices");

const listeningEvents = async (req, res) => {
  const { ts, event } = req.body;
  const idDeal = req.body["data[FIELDS][ID]"];

  //   console.log("🚀 ~ ts +event", ts, EVENT_ID, new Date());
  //   if (EVENT_ID.includes(Number(ts))) {
  //     console.log("!!!!!!!!!!alredy do");
  //     return res.send("ok");
  //   }
  //   console.log("🚀 ~ ts +event", ts, EVENT_ID);

  EVENT_ID = [...EVENT_ID, Number(ts)];

  const dealData = await getDealById(Number(idDeal));

  const dates = dealData[process.env.ARR_PAY_DATE];
  const approve = dealData[process.env.APPROVE_TO_CALENDAR];
  const count = dealData[process.env.COUNT_PAYMANT];
  const name = dealData["TITLE"];

  console.log("🚀 EVENT_ID", EVENT_ID);
  if (approve && dates.length > 0) {
    await addToCallendar({ dates, count, approve, name, idDeal });
  }
  res.send("ok");
};

module.exports = { listeningEvents };
