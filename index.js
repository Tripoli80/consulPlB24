const { app } = require("./src/app");
const { storage } = require("./src/helpers/storage");
require("dotenv").config();
const AWS = require("aws-sdk");

(async function () {
  const PORT = process.env.PORT || 80;

  var s3Client = new AWS.S3();

  var params = {
    Bucket: process.env.BUCKET,
    Key: "persist/",
  };
  console.log(
    "🚀 ~ file: index.js:15 ~ process.env.BUCKET",
    process.env.BUCKET
  );
  const dir = s3Client.upload(params, function (err, data) {
    if (err) {
      console.log("Error creating the folder: ", err);
    } else {
      console.log("Successfully created a folder on S3");
    }
  });
  console.log("🚀 ~ file: index.js:22 ~ dir", dir);

  await storage.init({
    dir: dir,

    stringify: JSON.stringify,

    parse: JSON.parse,

    encoding: "utf8",

    logging: false, // can also be custom logging function

    ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS or a valid Javascript Date object

    expiredInterval: 2 * 60 * 1000, // every 2 minutes the process will clean-up the expired cache

    // in some cases, you (or some other service) might add non-valid storage files to your
    // storage dir, i.e. Google Drive, make this true if you'd like to ignore these files and not throw an error
    forgiveParseErrors: false,
  });
  //   utils.rewriteCronFile(await jobDao.list());

  app.listen(PORT, () => {
    console.log("Server running. Use our API on port: ", PORT);
  });
  //   routes.register(app);
})();
