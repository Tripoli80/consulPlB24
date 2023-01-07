const { tryWrapper } = require("../helpers");
const { getDealById } = require("../services/dealServices");
const { getDeal } = require("./dealControllers");

const listeningEvents = async (req, res) => {
  console.dir(req.body);
  console.dir(req.body["event"]);
  const idDeal = req.body["data[FIELDS][ID]"];
  const dealData = await tryWrapper(getDealById(idDeal));
  console.log("🚀 ", dealData);

  res.send("ok");
};

module.exports = { listeningEvents };