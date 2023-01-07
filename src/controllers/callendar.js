const { addToCallendar } = require("../services/callendar");

const addPaymentToCallendar = async (req, res) => {
  const data = await addToCallendar(req);
  res.status(200);
  return res.json(data);
};

module.exports = { addPaymentToCallendar };
