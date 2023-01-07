const { EVENT_ID } = require("../constans");
const { tryWrapper } = require("../helpers");
const { getDealById } = require("../services/dealServices");
const { getDeal } = require("./dealControllers");

const listeningEvents = async (req, res) => {
  const { ts, event } = req.body;
  console.log("🚀 ~ file: listenEvent.js:9 ~ listeningEvents ~ EVENT_ID.", EVENT_ID)
  if (EVENT_ID.includes(ts)) {
    console.log("alredy do");
    return res.send("ok");
  }

  EVENT_ID.push(req.body.ts);
  console.dir(event);
  const idDeal = req.body["data[FIELDS][ID]"];
  const dealData = await tryWrapper(getDealById(idDeal));
  console.log("🚀 ", dealData);

  res.send("ok");
};

module.exports = { listeningEvents };
