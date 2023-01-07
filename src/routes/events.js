const express = require("express");
const { listeningEvents } = require("../controllers/listenEvent");
const { tryWrapper } = require("../helpers");

const router = express.Router();

// router.post("/getdeal", tryWrapper(getDeal));

router.post("/", tryWrapper(listeningEvents));

module.exports = router;
