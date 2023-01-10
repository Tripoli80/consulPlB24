const express = require("express");
const { EVENT_ID } = require("../constans");
const { addPaymentToCallendar } = require("../controllers/callendar");
const { listeningEvents } = require("../controllers/listenEvent");
const { tryWrapper } = require("../helpers");
const {  verifyCache } = require("../midelware/cache");
const { checkDublikat } = require("../midelware/checkDublikat");

const router = express.Router();

// router.post("/getdeal", tryWrapper(getDeal));

router.post("/", checkDublikat, tryWrapper(listeningEvents));
router.post("/cal", tryWrapper(addPaymentToCallendar));

module.exports = router;
