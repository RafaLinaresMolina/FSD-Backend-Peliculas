
const express = require('express');

const usersRouter = require('./routes/user');
const filmRouter = require('./routes/film');
const actorsRouter = require('./routes/actor');
const genreRouter = require('./routes/genre');
const priceRouter = require('./routes/price');
const actorAppearFilmRouter = require('./routes/ActorAppearFilm');

const app = express();
const PORT = 5500;

app.use(express.json()); 
app.use('/users', usersRouter);
app.use('/films', filmRouter);
app.use('/actors', actorsRouter);
app.use('/genres', genreRouter);
app.use('/prices', priceRouter);
app.use('/actorsinfilm', actorAppearFilmRouter);


app.listen(PORT, () => console.log('server running on port ' + PORT));