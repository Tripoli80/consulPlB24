const { curl } = require("../helpers");

const addToCallendar = async ({ dates, count, approve, name, idDeal }) => {
  let result = [];
  const option = {
    id: idDeal,
    fields: {},
    params: { REGISTER_SONET_EVENT: "N" },
  };
  option.fields[process.env.ARR_PAY_DATE] = [];
  option.fields[process.env.APPROVE_TO_CALENDAR] = 0;
  option.fields[process.env.COUNT_PAYMANT] = 0;
  const updateDeal = await curl("crm.deal.update.json", option);

  console.log("🚀 updateDeal", updateDeal);

  for (const date of dates) {
    const option = {
      type: "group",
      ownerId: "5",
      name: `Paymant ${name} `,
      description: `https://uait.bitrix24.ua/crm/deal/details/${idDeal}/`,
      from: date,
      to: date,
      skipTime: "Y",
      section: 33,
      color: "#9cbe1c",
      text_color: "#283033",
      accessibility: "free",
      importance: "normal",
      is_meeting: "N",
      private_event: "N",
      remind: [{ type: "min", count: 60 }],
      location: "Warshava",
      attendees: [1, 2, 3],
    };

    result = [...result, await curl("calendar.event.add.json", option)];
  }

  return result;
};

module.exports = { addToCallendar };
