// const { storage } = require("../helpers/storage");

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

// const checkDublikat = (req, res, next) => {
//   let alldoArr = global.ts;
//   if (alldoArr === undefined) {
//     console.log("🚀  undefined");
//     alldoArr = [];
//   }
//   console.log("🚀1 allts", alldoArr);

//   const {
//     body: { ts },
//   } = req;

//   console.log("🚀2 ~ ts", ts, "/", alldoArr);

//   if (alldoArr.includes(Number(ts))) {
//     console.log("🚀3 +++++++", Number(ts));
//     return res.status(210).send("already worked");
//   }
//   alldoArr.push(Number(ts));
//   global.ts = alldoArr;
//   return next();
// };
const checkDublikat = async (req, res, next) => {
  let myts = {};

  const {
    body: { ts },
  } = req;

  try {
    myts = await s3
      .getObject({
        Bucket: "cyclic-eager-goat-helmet-ap-northeast-2",
        Key: "ts/tss.json",
      })
      .promise();

    let alldoArr = JSON.parse(myts.Body).ts;

    console.log("🚀1 ~ ts", ts, "/", alldoArr);
    if (alldoArr.includes(Number(ts))) {
      console.log("🚀3 pass", Number(ts));
      return res.status(210).send("already worked");
    }
    alldoArr.push(Number(ts));
    myts = { ts: alldoArr };

    await s3
      .putObject({
        Body: JSON.stringify(myts),
        Bucket: "cyclic-eager-goat-helmet-ap-northeast-2",
        Key: "ts/tss.json",
      })
      .promise();
  } catch (error) {
    // console.log("🚀 ~ file: checkDublikat.js:40 ~ error", error);
    myts = { ts: [req.body.ts] };
    await s3
      .putObject({
        Body: JSON.stringify(myts),
        Bucket: "cyclic-eager-goat-helmet-ap-northeast-2",
        Key: "ts/tss.json",
      })
      .promise();
  }

  return next();
};
// const checkDublikat = (req, res, next) => {
//   const {
//     body: { ts },
//   } = req;
//   let alldoArr = global.ts;
//   alldoArr.push(Number(ts));
//   global.ts = alldoArr;

//   console.log("🚀2 ~ ts", ts, global.ts);

//   return next();
// };
module.exports = { checkDublikat };
