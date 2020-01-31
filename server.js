require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 6789;

const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to the database'));

const usersRouter = require('./routes/user');
app.use('/', usersRouter);

const weightRouter = require('./routes/weight');
app.use('/', weightRouter);

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});
