// const { json } = require("body-parser");
require("dotenv").config();

const { EVENT_ID } = require("../constans");
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

  EVENT_ID.push(Number(ts));

  const dealData = await getDealById(Number(idDeal));
  console.dir(event, idDeal);
  console.log("🚀 DEAL: ");
  console.log(
    "🚀 ~ file: listenEvent.js:25 ~ process.env.APPROVE_TO_CALENDAR",
    process.env.API_HOOK,
    process.env.APPROVE_TO_CALENDAR
  );
  const dates = dealData[process.env.ARR_PAY_DATE];
  const approve = dealData[process.env.APPROVE_TO_CALENDAR];
  const count = dealData[process.env.COUNT_PAYMANT];
  const name = dealData["TITLE"];

  if (approve && dates.length > 0) {
    const toCal = await addToCallendar({ dates, count, approve, name, idDeal });
  }
  res.send("ok");
};

module.exports = { listeningEvents };
