// const { json } = require("body-parser");
require("dotenv").config();

const { curl } = require("../helpers");
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
    const option = {
      id: idDeal,
      fields: {},
      params: {
        REGISTER_SONET_EVENT: "N",
        REGISTER_EVENT: "N",
        EVENT: "N",
        REGISTER: "N",
      },
    };

    option.fields[process.env.ARR_PAY_DATE] = undefined;
    option.fields[process.env.APPROVE_TO_CALENDAR] = 0;
    option.fields[process.env.COUNT_PAYMANT] = 0;
    console.log("🚀 ~ file: listenEvent.js:33 ~ option", option)

    await curl("crm.deal.update.json", option);
    await addToCallendar({ dates, count, approve, name, idDeal });
    return res.status(201).send({ message: "add to calendar" });
  } else {
    return res.status(304).send({ message: "not approved" });
  }
};

module.exports = { listeningEvents };
