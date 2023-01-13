require("dotenv").config();

const { curl, resetApproveToCalendar } = require("../helpers");
const { addToCallendar } = require("../services/callendar");
const { getDealById } = require("../services/dealServices");


const listeningEvents = async (req, res) => {
  // Use constants instead of directly accessing environment variables
  const ARR_PAY_DATE = process.env.ARR_PAY_DATE;
  const APPROVE_TO_CALENDAR = process.env.APPROVE_TO_CALENDAR;
  const COUNT_PAYMANT = process.env.COUNT_PAYMANT;

  // Extract idDeal from request body
  const idDeal = req.body["data[FIELDS][ID]"];

  // Get deal data using idDeal
  const dealData = await getDealById(Number(idDeal));

  // Extract data from dealData
  const dates = dealData[ARR_PAY_DATE];
  const approve = dealData[APPROVE_TO_CALENDAR];
  const count = dealData[COUNT_PAYMANT];
  const user = dealData["ASSIGNED_BY_ID"];
  const name = dealData["TITLE"];

  // Check if approve is greater than 0 and dates are present
  if (+approve > 0 && dates.length > 0) {
    const option = await resetApproveToCalendar(idDeal);
    await addToCallendar({ dates, count, approve, name, idDeal, user });
    await curl("crm.deal.update.json", option);
    return res.status(201).send({ message: "sucsess crated event" });
  } else {
    return res.status(300).send({ message: "not approved" });
  }
};

module.exports = { listeningEvents };
