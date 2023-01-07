const { curl } = require("../helpers");

const addToCallendar = async (data) => {
  const option = {
    type: "group",
    ownerId: "5",
    name: "Paymant",
    description: "1 paymant",
    from: "2023-01-08",
    to: "2023-01-08",
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

    const result = await curl("calendar.event.add.json", option);
    return result
};


module.exports = { addToCallendar };