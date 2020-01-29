const express = require('express');
const router = express.Router();
const User = require('../models/User');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.send(err);
  }
});

router.post('/signup', async (req, res, next) => {
  const isUserRegistered = await User.findOne({ email: req.body.email });
  if (isUserRegistered) return next(new Error('User already exists'));
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    gender: req.body.gender,
    email: req.body.email,
    age: req.body.age,
    weight: req.body.weight,
  });
  try {
    newUser.save();
    return res.status(201).send({ message: 'Account created' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
  // TODO
  // Hash Password
  // Password and email validation
  // Other inputs validation
});

module.exports = router;
