const {  curl, prpareUpdateDealFinger } = require("../helpers");
const { addToCallendar, addToFingerCallendar } = require("./callendar");

const addFingerToCellendar = async ({
  date,
  name,
  idDeal,
  user,
}) => {
  const idEvent = await addToFingerCallendar({ date, name, idDeal, user });
  const option = await prpareUpdateDealFinger({ idDeal, idEvent });
  await curl("crm.deal.update.json", option);
  return { message: "event finger created" };
};

module.exports = { addFingerToCellendar };
