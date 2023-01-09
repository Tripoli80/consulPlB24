const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 });

const verifyCache = (req, res, next) => {
  const {
    body: { ts },
  } = req;
  try {
    if (cache.has("ts")) {
      const tss = cache.get("ts");
      if (tss.includes(Number(ts))) {
        return res.status(210).send({ massage: "already includet" });
      }
      tss.push(Number(ts));
      cache.set("ts", tss);
    } else {
      cache.set("ts", [ts]);
    }
    return next();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { verifyCache };
