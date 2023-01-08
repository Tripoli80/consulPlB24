const storage = require("node-persist");

const myStorage = storage.create();

// console.log(await storage.getItem("name"));
module.exports = { myStorage };
