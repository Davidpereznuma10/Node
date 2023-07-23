const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');

router.get('/', (req, res) => {
  const peoples = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    peoples.push({
      id:i,
      name: faker.person.firstName(),
      zodiaco: faker.person.zodiacSign(),
      edad: faker.number.int({min:18 ,max: 80}),
    });
  }
  res.json(peoples)
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
      id,
      name: 'Arturo',
      type: 'employee'
  });
});

module.exports = router;
