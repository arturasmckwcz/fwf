const express = require('express');
const router = express.Router();
// const connectionStr = 'mongodb://@127.0.0.1:27017';
const monk = require('monk');
const connectionStr = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@127.0.0.1:27017`;

const fs = require('fs');

router.get('/', (req, res) => {
  monk(connectionStr, async (error, db) => {
    if (error) {
      res.status(500);
      res.json(error);
    } else {
      const files = db.get('fs.files');
      const result = await files.find();
      res.json(result);
    }
  });
});

router.post('/', (req, res) => {
  monk(connectionStr, async (error, db) => {
    if (error) {
      res.status(500);
      res.json(error);
    } else {
      
      const files = db.get('fs.files');
      const result = await files.find();
      res.json(result);
    }
  });
});

// router.get('/2', (req, res) => {
//   files.find()
//     .then(
//       (result) => { res.json(result) },
//       (error) => { res.json(error) }
//     );
// });


// router.get('/3', (req, res) => {
//   files.find({}, (result) => {
//     res.json(result)
//   });
// });

module.exports = router;