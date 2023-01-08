const storage = require("node-persist");

const myStorage = storage.create({ dir: "./myDir", ttl: 3000 });

// console.log(await storage.getItem("name"));
module.exports = { myStorage };
