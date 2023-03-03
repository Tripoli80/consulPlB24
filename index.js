const { app } = require("./src/app");
require("dotenv").config();

( function () {
  global.ts = [];
  const PORT = process.env.PORT || 80;

  app.listen(PORT, () => {
    console.log("Server running. Use our API on port: ", PORT);
  });
  //   routes.register(app);
})();
