const express = require("express");
require("dotenv").config();
const Log = require("./lib/logger");
Log.readConfig("./config/logger.json")
  .then(() => {
    Log.debug("Logger working");
  })
  .catch((err) => {
    console.log(err.message);
  });
const usersRouter = require("./routes/user");
const filmRouter = require("./routes/film");
const actorsRouter = require("./routes/actor");
const genreRouter = require("./routes/genre");
const priceRouter = require("./routes/price");
const actorAppearFilmRouter = require("./routes/ActorAppearFilm");

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use("/users", usersRouter);
app.use("/films", filmRouter);
app.use("/actors", actorsRouter);
app.use("/genres", genreRouter);
app.use("/prices", priceRouter);
app.use("/actorsinfilm", actorAppearFilmRouter);
process.log = Log;
app.listen(PORT, () => {
  Log.readConfig("./config/logger.json")
    .then(() => {
      Log.info(`Server Up at port: ${PORT}`);
    })
    .catch((err) => {
      console.log(err);
    });
});
