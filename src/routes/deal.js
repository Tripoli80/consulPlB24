const express = require("express");
const { getDeal } = require("../controllers/dealControllers");
const { tryWrapper } = require("../helpers");

const router = express.Router();

router.post("/getdeal", tryWrapper(getDeal));
router.get("/", () => {
  console.log("get");
});
router.post("/", () => {
  console.log("post");
});
router.options("/", () => {
  console.log("options");
});

router.delete("/", () => {
  console.log("delete");
});

module.exports = router;
