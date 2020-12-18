const express = require('express');
const router = express.Router();

const mongo = require('mongodb');
const assert = require('assert');
const fs = require('fs');

const mongo_uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@127.0.0.1:27017`;
const mongoClientOptions = { useUnifiedTopology: true };

router.get('/:file_id', (req, res, next) => {
  const { file_id } = req.params;
  mongo.MongoClient.connect(mongo_uri, mongoClientOptions, async (err, conn) => {
    assert.ifError(err);
    const db = conn.db('storage');
    let _id;
    try {
      _id = mongo.ObjectId(file_id);
    } catch (error) {
      res.status(422);
      next(error);
    };
    const bucket = new mongo.GridFSBucket(db);
    const result = await bucket.openDownloadStream(_id);
    console.log(_id, result);
    res.json({
      message: "Check console.log for result."
    });
    // bucket.openDownloadStream(_id)
    //   .on('error', (error) => {
    //     res.status(421);
    //   })
    //   .on('finish', (result) => res.json(result));
  });
});

router.get('/', (req, res) => {
  mongo.MongoClient.connect(mongo_uri, mongoClientOptions, async (err, conn) => {
    assert.ifError(err);
    const files = await conn.db('storage')
      .collection('fs.files')
      .find()
      .toArray();
    res.json(files);
  });
});

router.post('/', (req, res) => {
  const { file_name, file_url } = req.body;
  mongo.MongoClient.connect(mongo_uri, mongoClientOptions, (err, conn) => {
    assert.ifError(err);
    const db = conn.db('storage');
    const bucket = new mongo.GridFSBucket(db);
    fs.createReadStream(file_url).
      pipe(bucket.openUploadStream(file_name)).
      on('error', err => assert.ifError(err)).
      on('finish', (result) => {
        res.json(result);
      });
  });
});

router.delete('/:file_id', (req, res, next) => {
  const { file_id } = req.params;
  mongo.MongoClient.connect(mongo_uri, mongoClientOptions, (err, conn) => {
    assert.ifError(err);
    const db = conn.db('storage');
    const bucket = new mongo.GridFSBucket(db);
    let _id;
    try {
      _id = mongo.ObjectId(file_id);
    } catch (error) {
      res.status(422);
      next(error);
    };
    bucket.delete(_id, (error, result) => {
      res.json({
        message: error === null ? "Success." : "File not found",
        result,
      });
    });
  });
});

module.exports = router;
