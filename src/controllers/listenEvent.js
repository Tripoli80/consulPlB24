const { json } = require("body-parser");
const { EVENT_ID } = require("../constans");
const { tryWrapper } = require("../helpers");
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
  const dates = dealData[process.env.ARR_PAY_DATE];
  console.log("🚀 ~ file: listenEvent.js:23 ~ dates", dates)
  const approve = dealData[process.env.APPROVE_TO_CALENDAR];
  console.log("🚀 ~ file: listenEvent.js:25 ~ approve", approve)
  const count = dealData[process.env.COUNT_PAYMANT];
  console.log("🚀 ~ file: listenEvent.js:27 ~ count", count)


  res.send("ok");
};

module.exports = { listeningEvents };
