const { getDeal } = require("./dealControllers");

const listeningEvents = async (req, res) => {
  console.dir(req.body["data[FIELDS][ID]"]);
  console.dir(req.body[" event"]);
  const dealData = await tryWrapper(getDeal);
  console.log("🚀 ", dealData);

  res.send("ok");
};

module.exports = { listeningEvents };
