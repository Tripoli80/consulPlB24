const axios = require("axios").default;
const { Conflict, Unauthorized, NotFound, BadRequest } = require("http-errors");

const fetchToBitrix = axios.create({
  baseURL: process.env.API_HOOK,
  // timeout: 5000,
  // headers: {'X-Custom-Header': 'foobar'}
});
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
  try {
    const result = await fetchToBitrix.post(metod, option);
    const responce = result.data.result;
    return responce;
  } catch (error) {
    if (error.response.data.error_description === "Not found")
      throw new NotFound();
    throw new BadRequest(error.response.data);
  }
};

module.exports = {
  tryWrapper,
  errorHandler,
  curl,
};
