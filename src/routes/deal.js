const express = require("express");
const { getDeal } = require("../controllers/dealControllers");
const { tryWrapper } = require("../helpers");

const router = express.Router();

router.post("/getdeal", tryWrapper(getDeal));

router.post("/", (reqw, res) => {
    const req= {...reqw}

  console.log("all: ", req.body);
  console.log("headers: ", req.headers);
  console.log("data: ", req.data);
  console.log("params: ", req.params);
  console.log("query: ", req.query);
  console.log("req: ", req);    
});

module.exports = router;
