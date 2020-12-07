const express = require('express');
const router = express.Router();
const User = require('./users.model');

router.get('/', async (req, res) => {
  const users = await User.query()
    .where('deleted_at', null);
  res.json(users);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.query()
      .where('deleted_at', null)
      .findById(parseInt(id, 10) || 0);
    if (user) {
      return res.json(user);
    }
    return next();
  } catch (error) {
    return next(error);
  };
});

module.exports = router;