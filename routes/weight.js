const express = require('express');
const router = express.Router();
const Weight = require('../models/Weight');

router.post('/weights/add', (req, res, next) => {
  const newWeight = new Weight({
    userId: req.body.userId,
    value: req.body.value,
  });
  try {
    newWeight.save();
    res.status(201).send({ message: 'Weight successfully added' });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
