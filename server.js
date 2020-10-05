
const express = require('express');

const usersRouter = require('./routes/user');
const filmRouter = require('./routes/film');
const actorsRouter = require('./routes/actor');

const app = express();
const PORT = 5500;

app.use(express.json()); 
app.use('/users', usersRouter);
app.use('/films', filmRouter);
app.use('/actors', actorsRouter);

app.listen(PORT, () => console.log('server running on port ' + PORT));