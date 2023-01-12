const { curl } = require("../helpers");

const addToCallendar = async ({ dates, count, approve, name, idDeal }) => {
  let result = [];

  for (const date of dates) {
    if (date.includes("1999")) {
      console.log("🚀 ~ file: callendar.js:11 ~ continue");
      continue;
    }
    const option = {
      type: "group",
      ownerId: "5",
      name: `Плановая оплата ${name} `,
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
    };

    result = [...result, await curl("calendar.event.add.json", option)];
  }

  return result;
};

module.exports = { addToCallendar };
