const express = require("express");
const { addPaymentToCallendar } = require("../controllers/callendar");
const { listeningEvents } = require("../controllers/listenEvent");
const { tryWrapper } = require("../helpers");

const router = express.Router();

// router.post("/getdeal", tryWrapper(getDeal));

router.post("/", tryWrapper(listeningEvents));
router.post("/cal", tryWrapper(addPaymentToCallendar));

module.exports = router;