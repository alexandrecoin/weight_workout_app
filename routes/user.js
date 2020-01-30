const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
  const salt = bcrypt.genSaltSync(12);
  const newUser = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
  });
  console.log(newUser);
  try {
    newUser.save();
    return res.status(201).send({ message: 'Account created' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
  // TODO
  // Password and email validation
});

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new Error('No account is associated with this email address'));
  try {
    bcrypt.compare(req.body.password, user.password, (_, result) => {
      if (!result)
        return res
          .status(400)
          .send({ err: 'Password or email is invalid. Please try again.' });
// TODO
// Ajouter token à la session de connexion du user    
      res.status(200).send(`User ${user._id} connected`);
    });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

module.exports = router;
