
const express = require('express');

const usersRouter = require('./routes/user');
const app = express();
const PORT = 5500;

app.use(express.json()); 
app.use('/users', usersRouter);

app.listen(PORT, () => console.log('server running on port ' + PORT));