const express = require("express");
const { getDeal } = require("../controllers/dealControllers");
const { tryWrapper } = require("../helpers");

const router = express.Router();

router.post("/getdeal", tryWrapper(getDeal));

router.post("/", (req, res) => {
  //   console.log("err: ", err);
  const requestBody = [];
  req.on("data", (chunks) => {
    requestBody.push(chunks);
  });
  console.log("Body");
  console.dir(requestBody);
  res.send("test");
  //   console.log("req: ", req);
  //   console.log("res: ", res);
});

module.exports = router;
