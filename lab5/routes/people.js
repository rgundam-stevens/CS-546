const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.people;

router.get('/:id', async (req, res) => {
  try {
    const people = await peopleData.getPeopleById(req.params.id);
    res.json(people);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.get('/', async (req, res) => {
  try {
    const peopleList = await peopleData.getAllPeople();
    res.json(peopleList);
  } catch (e) {
    res.status(500).send();
  }
});



module.exports = router;