const {  curl, prpareUpdateDealCard } = require("../helpers");
const {addToCardCallendar } = require("./callendar");

const addCardToCellendar = async ({
  date,
  name,
  idDeal,
  user,
}) => {
  const idEvent = await addToCardCallendar({ date, name, idDeal, user });
  const option = await prpareUpdateDealCard({ idDeal, idEvent });
  await curl("crm.deal.update.json", option);
  return { message: "event card created" };
};

module.exports = { addCardToCellendar };
