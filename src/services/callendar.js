const { curl } = require("../helpers");
require("dotenv").config();

const addToCallendar = async ({ dates, name, idDeal, user }) => {
  let result = [];
  let counter = 0;
  for (const date of dates) {
    counter += 1;

    const CALENDAR_GROUP = process.env.CALENDAR_PAYMANT_GROUP;
    const CALENDAR_SECTION = process.env.CALENDAR_PAYMANT_SECTION;
    const URI_PORTAL = process.env.URI_PORTAL;

    const option = {
      type: "group",
      ownerId: CALENDAR_GROUP,
      name: `PAY #${counter}: ${name} `,
      description: `${URI_PORTAL}/crm/deal/details/${idDeal}/`,
      from: date,
      to: date,
      skipTime: "Y",
      section: CALENDAR_SECTION,
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
    };

    try {
      const res = await curl("calendar.event.add.json", option);
      result = [...result, res];
    } catch (error) {
      throw Error(error);
    }
  }

  return result;
};

const addToFingerCallendar = async ({ date, name, idDeal, user }) => {
  let idEvent;
  const CALENDAR_GROUP = process.env.CALENDAR_FINGER_GROUP;
  const CALENDAR_SECTION = process.env.CALENDAR_FINGER_SECTION;
  const URI_PORTAL = process.env.URI_PORTAL;
  let skip = "N";

  if (date.includes("00:00:00")) {
    skip = "Y";
  }
  const option = {
    type: "group",
    ownerId: CALENDAR_GROUP,
    name: `${name} `,
    description: `${URI_PORTAL}/crm/deal/details/${idDeal}/`,
    from: date,
    to: date,
    skipTime: skip,
    section: CALENDAR_SECTION,
    color: "rgb(222, 43, 36)",
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
  };
  try {
    idEvent = await curl("calendar.event.add.json", option);
  } catch (error) {
    throw Error(error);
  }
  return idEvent;
};

const addToCardCallendar = async ({ date, name, idDeal, user }) => {
  let idEvent;
  const CALENDAR_GROUP = process.env.CALENDAR_FINGER_GROUP;
  const CALENDAR_SECTION = process.env.CALENDAR_CARD_SECTION;
  const URI_PORTAL = process.env.URI_PORTAL;
  let skip = "N";

  if (date.includes("00:00:00")) {
    skip = "Y";
  }
  const option = {
    type: "group",
    ownerId: CALENDAR_GROUP,
    name: `CARD ${name} `,
    description: `${URI_PORTAL}/crm/deal/details/${idDeal}/`,
    from: date,
    to: date,
    skipTime: skip,
    section: CALENDAR_SECTION,
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
  };
  try {
    idEvent = await curl("calendar.event.add.json", option);
  } catch (error) {
    throw Error(error);
  }
  return idEvent;
};
module.exports = { addToCallendar, addToFingerCallendar, addToCardCallendar };
