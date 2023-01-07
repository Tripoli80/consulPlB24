const { json } = require("body-parser");
const { EVENT_ID } = require("../constans");
const { tryWrapper } = require("../helpers");
const { getDealById } = require("../services/dealServices");
const { getDeal } = require("./dealControllers");

const listeningEvents = async (req, res) => {

    const data =  JSON.stringify(req.body)
    console.log("🚀 ~ file: listenEvent.js:10 ~ listeningEvents ~ data", data)
    const { ts, event } = req.body;
    
  console.log("🚀 ~ ts +event", ts, EVENT_ID, new Date());
  if (EVENT_ID.includes(Number(ts))) {
    console.log("!!!!!!!!!!alredy do");
    return res.send("ok");
  }
  console.log("🚀 ~ ts +event", ts, EVENT_ID);

  EVENT_ID.push(Number(ts));

  const idDeal = req.body["data[FIELDS][ID]"];
  const dealData = await tryWrapper(getDealById(idDeal));
  console.dir(event, idDeal);
  console.log("🚀 ", dealData);

  res.send("ok");
};

module.exports = { listeningEvents };
