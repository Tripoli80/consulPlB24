const { json } = require("body-parser");
const { EVENT_ID } = require("../constans");
const { tryWrapper } = require("../helpers");
const { getDealById } = require("../services/dealServices");
const { getDeal } = require("./dealControllers");

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
  console.log(dealData);

  res.send("ok");
};

module.exports = { listeningEvents };
