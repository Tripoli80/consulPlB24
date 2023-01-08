const { all } = require("axios");
const { EVENT_ID } = require("../constans");
const { myStorage } = require("../helpers/storage");

const checkDublikat = async (req, res, next) => {
  let alldoArr = await myStorage.getItem("idts");
  if (alldoArr === undefined) {
    alldoArr = [];
  }
  console.log("🚀1 allts", alldoArr);

  const {
    body: { ts },
  } = req;

  console.log("🚀2 ~ file: events.js:16 ~ ts", ts, "/", alldoArr);

  if (alldoArr.includes(Number(ts))) {
    console.log("🚀3 ~includin", ts);
    return res.status(210).send("already do");
  }
  alldoArr.push(Number(ts));
  await myStorage.setItem("idts", alldoArr);
  return next();
};
module.exports = { checkDublikat };
