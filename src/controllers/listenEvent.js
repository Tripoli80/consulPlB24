require("dotenv").config();

const { curl, resetApproveToCalendar } = require("../helpers");
const { addToCallendar } = require("../services/callendar");
const { addCardToCellendar } = require("../services/cardServices");
const { getDealById } = require("../services/dealServices");
const { addFingerToCellendar } = require("../services/fingerServices");
const { addPaymantDate } = require("../services/paymentServices");

const listeningEvents = async (req, res) => {
  // Use constants instead of directly accessing environment variables
  const ARR_PAY_DATE = process.env.ARR_PAY_DATE;
  const APPROVE_TO_CALENDAR = process.env.APPROVE_TO_CALENDAR;
  const COUNT_PAYMANT = process.env.COUNT_PAYMANT;
  
  const FINGER_DATE = process.env.FINGER_DATE;
  const ID_FINGER_DATE = process.env.ID_FINGER_DATE;

  const CARD_DATE = process.env.CARD_DATE; ;
  const ID_TAKE_CARD_DATE = process.env.ID_TAKE_CARD_DATE;

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
  const fingerDate = dealData[FINGER_DATE];
  const idFingerDate = dealData[ID_FINGER_DATE];

  const cardDate = dealData[CARD_DATE];
  const idTakeCardDate = dealData[ID_TAKE_CARD_DATE];



  // response const
  let returnData = {};
  // Check if approve is greater than 0 and dates are present
  if (+approve&& dates.length > 0) {
    const paymentInfo = await addPaymantDate({
      dates,
      count,
      approve,
      name,
      idDeal,
      user,
    });
    paymentInfo.status = 201;
    returnData = { ...returnData, paymentInfo };
  }

  if (!idFingerDate && fingerDate) {
    let fingerInfo = await addFingerToCellendar({
      date: fingerDate,
      name,
      idDeal,
      user,
    });
    fingerInfo.status = 201;
    returnData = { ...returnData, fingerInfo };
  }
  if (!idTakeCardDate && cardDate) {
    let cardInfo = await addCardToCellendar({
      date: cardDate,
      name,
      idDeal,
      user,
    });
    cardInfo.status = 201;
    returnData = { ...returnData, info: cardInfo };
  }
  return res.status(200).send(returnData);
};

module.exports = { listeningEvents };
