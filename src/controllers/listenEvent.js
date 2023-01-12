// const { json } = require("body-parser");
require("dotenv").config();

const { curl, resetApproveToCalendar } = require("../helpers");
const { storage } = require("../helpers/storage");
const { addToCallendar } = require("../services/callendar");
const { getDealById } = require("../services/dealServices");

const listeningEvents = async (req, res) => {
  const idDeal = req.body["data[FIELDS][ID]"];

  const dealData = await getDealById(Number(idDeal));

  const dates = dealData[process.env.ARR_PAY_DATE];
  const approve = dealData[process.env.APPROVE_TO_CALENDAR];
  const count = dealData[process.env.COUNT_PAYMANT];
  const name = dealData["TITLE"];
    if (+approve > 0 && dates.length > 0) {
  // if (dates.length > 0) {
    const option = await resetApproveToCalendar(idDeal);
    await addToCallendar({ dates, count, approve, name, idDeal });
    await curl("crm.deal.update.json", option);
    
    const resultDeal = await getDealById(Number(idDeal));
    const dates2 = resultDeal[process.env.ARR_PAY_DATE];

    return res.status(201).send({ message: dates2 });
  } else {
    return res.status(300).send({ message: "not approved" });
  }
};

module.exports = { listeningEvents };
