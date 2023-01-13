const { resetApproveToCalendar, curl } = require("../helpers");
const { addToCallendar } = require("./callendar");

const addPaymantDate = async ({
  dates,
  count,
  approve,
  name,
  idDeal,
  user,
}) => {
  const option = await resetApproveToCalendar(idDeal);
  await addToCallendar({ dates, count, approve, name, idDeal, user });
  await curl("crm.deal.update.json", option);
  return { message: "event created" };
};

module.exports = { addPaymantDate };
