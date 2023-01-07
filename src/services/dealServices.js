const axios = require("axios").default;
const { Conflict, Unauthorized, NotFound, BadRequest } = require("http-errors");

const instance = axios.create({
  baseURL: process.env.API_HOOK,
  // timeout: 5000,
  // headers: {'X-Custom-Header': 'foobar'}
});
const getDealById = async (id) => {
  const option = { id };
  try {
    const result = await instance.post(`crm.deal.get.json`, option);
    if (!result) return {};
    const responce = result.data.result;
    return responce;
  } catch (error) {
    if (error.response.data.error_description === "Not found")
      throw new NotFound();
    // return { message: "Not found" };
    throw new BadRequest(error.response.data);
  }
};

module.exports = {
  getDealById,
};
