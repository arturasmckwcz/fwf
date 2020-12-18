const  = require('monk');
const connectionStr = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@127.0.0.1:27017/storage`;
const db = monk(connectionStr);
const files = db.get('fs.files');

module.exports = {
  files,
};