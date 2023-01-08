const { EVENT_ID } = require("../constans");

const checkDublikat = (req, res, next) => {
  const {
    body: { ts },
  } = req;
  console.log("🚀 ~ file: events.js:16 ~ ts", ts, "/", EVENT_ID);
  if (EVENT_ID.includes(Number(ts))) {
    return res.status(210).send("already do");
  }
  EVENT_ID.push(Number(ts));
  return next();
};
module.exports = { checkDublikat };
