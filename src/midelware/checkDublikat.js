const { storage } = require("../helpers/storage");

const checkDublikat = async (req, res, next) => {
  let alldoArr = await storage.getItem("idts");
  if (alldoArr === undefined) {
    console.log("🚀  undefined");
    alldoArr = [];
  }
  console.log("🚀1 allts", alldoArr);

  const {
    body: { ts },
  } = req;

  console.log("🚀2 ~ ts", ts, "/", alldoArr);

  if (alldoArr.includes(Number(ts))) {
    console.log("🚀3 +++++++", Number(ts));
    return res.status(210).send("already worked");
  }
  alldoArr.push(Number(ts));
  await storage.setItem("idts", alldoArr);
  return next();
};
module.exports = { checkDublikat };
