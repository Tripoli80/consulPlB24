require("dotenv").config();

const auth = async (req, res, next) => {
  const secret = process.env.SECRET;
  console.log("🚀 ~ file: auth.js:3 ~ secret", secret);
  const { body } = req;
    console.log(body["auth[application_token]"]);
    if (secret === body["auth[application_token]"]) { 
        console.log("next")
    }
      return res.status(200).json({ auth: body["auth[application_token]"] });
};

module.exports = auth;
