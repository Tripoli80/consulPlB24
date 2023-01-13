const { curl } = require("../helpers");

const addToCallendar = async ({
  dates,
  count,
  approve,
  name,
  idDeal,
  user,
}) => {
  console.log("🚀 ~ file: callendar.js:4 ~ user", user);
  let result = [];

  for (const date of dates) {
    if (date.includes("1999")) {
      continue;
    }
    const option = {
      type: "group",
      ownerId: "2",
      name: `1 Плановая оплата ${name} `,
      description: `https://consultcorporated.bitrix24.pl/crm/deal/details/${idDeal}/`,
      from: date,
      to: date,
      skipTime: "Y",
      section: 26,
      color: "#00a64c",
      text_color: "#283033",
      accessibility: "free",
      importance: "normal",
      is_meeting: "Y",
      private_event: "N",
      remind: [{ type: "min", count: 60 }],
      location: "Warshava",
      attendees: [user],
      host: 1,
      meeting: {
        text: "inviting text",
        open: true,
        notify: true,
        reinvite: false,
      },
      UF_CRM_EVENT: `DEAL_${idDeal}`,
    };
    try {
      const res = await curl("calendar.event.add.json", option);
      result = [...result, res];
    } catch (error) {
      console.log("🚀 ~ file: callendar.js:49 ~ error", error);
    }
  }

  return result;
};

module.exports = { addToCallendar };
