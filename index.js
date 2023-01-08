const { app } = require("./src/app");
const { storage } = require("./src/helpers/storage");
require("dotenv").config();

(async function () {
  const PORT = process.env.PORT || 80;

  await storage.init();
  //   utils.rewriteCronFile(await jobDao.list());

  app.listen(PORT, () => {
    console.log("Server running. Use our API on port: ", PORT);
  });
  //   routes.register(app);
})();
