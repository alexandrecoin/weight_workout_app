require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Weight = require('../models/Weight');
const Token = require('../models/Token');
const bcrypt = require('bcryptjs');
const validator = require('validator');
var jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { SECRET_KEY } = process.env;
const tokenExpiresIn = 86400;
const verifyToken = require('../helpers/verifyToken');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.send(err);
  }
});

router.post('/signup', async (req, res, next) => {
  const newUser = {};
  const isUserRegistered = await User.findOne({ email: req.body.email });
  if (isUserRegistered) return next(new Error('User already exists'));
  const salt = bcrypt.genSaltSync(12);
  if (validator.isEmail(req.body.email)) {
    newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      confirmPassword: req.body.confirmPassword,
    });

    if (!newUser.confirmPassword) {
      return res.status(400).send({ error: 'Password must be confirmed' });
    }
    if (req.body.password !== newUser.confirmPassword) {
      return res.status(400).send({ error: 'Passwords must match' });
    }
  }
  try {
    const user = await newUser.save();
    if (user) {
      var token = jwt.sign({ id: user._id }, SECRET_KEY, {
        expiresIn: tokenExpiresIn,
      });
    }
    return res
      .status(201)
      .send({ auth: true, token, message: 'Account created' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new Error('No account is associated with this email address'));
  try {
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password,
    );
    if (!isPasswordValid) res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: tokenExpiresIn,
    });
    res.status(200).send({ auth: true, token: token });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

router.get('/users/:id/weights', async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(new Error('Could not find user associated with that ID'));
  try {
    const weights = await Weight.find({ userId: user._id });
    if (!weights) return next(new Error('No associated weight for this user'));
    res.status(200).send(weights);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

module.exports = router;
