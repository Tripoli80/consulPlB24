const axios = require("axios").default;
const { BadRequest } = require("http-errors");


const tryWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
};

const curl = async (metod, option) => {
  const fetchToBitrix = axios.create({
    baseURL: process.env.API_HOOK,
    // headers: {'X-Custom-Header': 'foobar'}
    // timeout: 5000,
  });
  console.log("🚀 ~ file: index.js:9 ~ process.env.API_HOOK", process.env.API_HOOK)
  try {
    const result = await fetchToBitrix.post(metod, option);
    console.log("🚀 ~ file: index.js:24 ~ result", result)
    const responce = result.data.result;
    return responce;
  } catch (error) {
    throw new BadRequest({ error, metod });
  }
};

module.exports = {
  tryWrapper,
  errorHandler,
  curl,
};
