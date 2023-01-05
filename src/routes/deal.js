const express = require("express");
const { getDeal } = require("../controllers/dealControllers");
const { tryWrapper } = require("../helpers");

const router = express.Router();

router.post("/getdeal", tryWrapper(getDeal));

router.post("/", (err, req, res) => {
  console.log("err: ", err);
  console.log("req: ", req);
  console.log("res: ", res);
});

module.exports = router;
