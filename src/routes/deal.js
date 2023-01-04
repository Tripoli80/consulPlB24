const express = require("express");
const { getDeal } = require("../controllers/dealControllers");
const { tryWrapper } = require("../helpers");

const router = express.Router();

router.post("/getdeal", tryWrapper(getDeal));
router.get("/", () => {
  console.log("get");
});
router.all("/", (req, res) => {
  console.log("all: ", req);
});

module.exports = router;
