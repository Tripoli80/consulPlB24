const express = require("express");
const { getDeal } = require("../controllers/dealControllers");
const { tryWrapper } = require("../helpers");

const router = express.Router();

router.post("/getdeal", tryWrapper(getDeal));

router.post("/", (req, res) => {
    console.log("all: ", req.body);
  console.log("params: ", req.params);
  console.log("query: ", req.query);
    
});

module.exports = router;
