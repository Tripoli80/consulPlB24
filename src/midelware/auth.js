require("dotenv").config();

const auth = async (req, res, next) => {
  const secret = process.env.SECRET;
  const { body } = req;
  if (secret === body["auth[application_token]"]) {
    return next();
  } else return res.status(401).json();
};

module.exports = auth;
