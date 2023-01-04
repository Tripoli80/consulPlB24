const { getDealById } = require("../services/dealServices");

const getDeal = async (req, res) => {
  const data = await getDealById(req);

  res.status(200);
  return res.json(data);
};

module.exports = { getDeal };
