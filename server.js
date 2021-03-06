const express = require("express");
require("dotenv").config();
const Log = require("./lib/logger");

const usersRouter = require("./routes/user");
const filmRouter = require("./routes/film");
const actorsRouter = require("./routes/actor");
const genreRouter = require("./routes/genre");
const priceRouter = require("./routes/price");
const OrderRouter = require("./routes/order");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const app = express();
const PORT = process.env.PORT || 5500;

Log.readConfig("./config/logger.json").then(() => {
  process.log = Log;
  init();
}).catch(err => {
  console.log(err.message);
}) 

const init = () => {
  app.use(express.json());
  app.use("/users", usersRouter);
  app.use("/auth", authRouter);
  app.use("/profile", profileRouter);
  app.use("/films", filmRouter);
  app.use("/actors", actorsRouter);
  app.use("/genres", genreRouter);
  app.use("/prices", priceRouter);
  app.use("/orders", OrderRouter);

  app.listen(PORT, () => {
      process.log.info(`Server Up at port: ${PORT}`);
  });
}
