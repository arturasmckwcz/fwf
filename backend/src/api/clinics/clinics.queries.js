const db = require('../../db');
const tablenames = require('../../../constants/tablenames');

const fields = ['id', 'name'];

module.exports = {
    // TODO: add foreign key represented values
  find() {
    return db(tablenames.clinic).select();
    // return db(tablenames.clinic).select(fields);
  },
    // TODO: get by id, person i_d, clinic_id
  async get(id) {
    return db(tablenames.clinic)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
};
