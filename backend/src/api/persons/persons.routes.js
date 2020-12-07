const express = require('express');
const router = express.Router();
const Person = require('./persons.model');

router.get('/', async (req, res) => {
  const persons = await Person.query().where({
    deleted_at: null,
  });
  res.json(persons);
});

router.get('/deleted', async (req, res) => {
  const persons = await Person.query()
    .whereNot({deleted_at: null});
  res.json(persons);
});

router.get('/:id', async (req, res, next) => {
  const {id} = req.params;
  try {
    const person = await Person.query()
      .where({deleted_at: null})
      .findById(parseInt(id, 10) || 0);
    if (person) {
      res.json(person);
    }
    next();
  } catch (error) {
    next(error);
  };
});

router.post('/', async (req, res, next) => {
  try {
    const person = await Person.query()
      .insert(req.body);
    res.json(person);
  } catch(error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  const {id} = req.params;
  console.log(`At api/persons/:id POST ${id}`);
  try {
    const person = await Person.query()
      .patchAndFetchById(id, req.body);
    res.json({
      message: person ? `Record with ID ${id} has been updated` : `Record with ID ${id} not found.`
    });
  } catch(error) {
    next(error);
  };
});

router.delete('/:id', async (req, res, next) => {
  const {id} = req.params;
  const deletedAt = {
    deleted_at: new Date().toISOString(),
  };
  console.log(`At api/persons/:id DELETE ${id}`);
  try {
    const deletedPerson = await Person.query()
      .patchAndFetchById(id, deletedAt);
    res.json({
      message: deletedPerson ? `Record with ID ${id} has been deleted` : `Record with ID ${id} not found.`
    });
  } catch(error) {
    next(error);
  };
});

router.get('/true', async (req, res) => {
  const persons = await Person.query();
  res.json(persons);
});

router.delete('/true/:id', async (req, res, next) => {
  const {id} = req.params;
  const deleted = await Person.query()
    .deleteById(id);
  res.json({
    message: deleted ? `Record with ID ${id} has been deleted` : `Record with ID ${id} not found.`
  });
});

module.exports = router;