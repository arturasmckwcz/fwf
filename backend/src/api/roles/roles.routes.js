const express = require('express');
const router = express.Router();
const Role = require('./roles.model');

router.get('/', async (req, res) => {
  const roles = await Role.query()
    .where('deleted_at', null);
  res.json(roles);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const role = await Role.query()
      .where('deleted_at', null)
      .findById(parseInt(id, 10) || 0);
    if (role) {
      return res.json(role);
    }
    return next();
  } catch (error) {
    return next(error);
  };
});

module.exports = router;