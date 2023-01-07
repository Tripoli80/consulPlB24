const { EVENT_ID } = require("../constans");
const { tryWrapper } = require("../helpers");
const { getDealById } = require("../services/dealServices");
const { getDeal } = require("./dealControllers");

const listeningEvents = (req, res) => {
  const { ts, event } = req.body;
  if (EVENT_ID.includes(+ts)) {
    console.log("alredy do");
    return res.send("ok");
  }

  EVENT_ID.push(Number(ts));

  console.log("🚀 ~ ts +event.", ts, EVENT_ID);
  const idDeal = req.body["data[FIELDS][ID]"];
  const dealData = tryWrapper(getDealById(idDeal)).then(console.log);
  console.dir(event, idDeal);

  res.send("ok");
};

module.exports = { listeningEvents };
