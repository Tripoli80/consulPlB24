const express = require("express");
const { EVENT_ID } = require("../constans");
const { addPaymentToCallendar } = require("../controllers/callendar");
const { listeningEvents } = require("../controllers/listenEvent");
const { tryWrapper } = require("../helpers");

const router = express.Router();

// router.post("/getdeal", tryWrapper(getDeal));

router.post(
  "/",
  tryWrapper((req, res) => {
    const {
      body: { ts },
    } = req;
    console.log("🚀 ~ file: events.js:16 ~ ts", ts);
    if (EVENT_ID.includes(Number(ts))) {
      return res.status(210).send("already do");
    }
    EVENT_ID.push(Number(ts));
    listeningEvents(req, res);
  })
);
router.post("/cal", tryWrapper(addPaymentToCallendar));

module.exports = router;
