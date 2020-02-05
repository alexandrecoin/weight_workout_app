require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 6789;

const mongoose = require('mongoose');

const { DATABASE_URI, FRONT_APP_URI } = process.env;

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(DATABASE_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to the database'));

const corsConfig = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', FRONT_APP_URI);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
};

app.use(corsConfig);

const usersRouter = require('./routes/user');
app.use('/', usersRouter);

const weightRouter = require('./routes/weight');
app.use('/', weightRouter);

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});
