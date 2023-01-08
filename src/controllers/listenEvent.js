// const { json } = require("body-parser");
require("dotenv").config();

let { EVENT_ID } = require("../constans");
const { curl } = require("../helpers");
const { addToCallendar } = require("../services/callendar");
// const { tryWrapper } = require("../helpers");
const { getDealById } = require("../services/dealServices");

const listeningEvents = async (req, res) => {
  const { ts, event } = req.body;
  const idDeal = req.body["data[FIELDS][ID]"];
  EVENT_ID = [...EVENT_ID, Number(ts)];
  console.log("🚀 EVENT_ID", EVENT_ID);

  const dealData = await getDealById(Number(idDeal));

  const dates = dealData[process.env.ARR_PAY_DATE];
  const approve = dealData[process.env.APPROVE_TO_CALENDAR];
  const count = dealData[process.env.COUNT_PAYMANT];
  const name = dealData["TITLE"];
  console.log("🚀 ~  dateslength", dates.length);
  console.log("🚀 ~  approve", approve);

  if (+approve > 0 && dates.length > 0) {
    console.log("in If");
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
    option.fields[process.env.ARR_PAY_DATE] = 0;
    option.fields[process.env.APPROVE_TO_CALENDAR] = 0;
    option.fields[process.env.COUNT_PAYMANT] = 0;

    await curl("crm.deal.update.json", option);
    await addToCallendar({ dates, count, approve, name, idDeal });
    return res.send("ok");
  } else {
    return res.send("not");
  }
};

module.exports = { listeningEvents };
