const db = require('../../db');
const tablenames = require('../../../constants/tablenames');

const fields = ['id', 'person_id', 'clinic_id'];

module.exports = {
    // TODO: add foreign key represented values
  find() {
    return db(tablenames.patient).select();
    // return db(tablenames.patient).select(fields);
  },
    // TODO: get by id, person i_d, clinic_id
  async get(id) {
    return db(tablenames.patient)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
};
