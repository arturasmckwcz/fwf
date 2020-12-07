const db = require('../../db');
const tablenames = require('../../../constants/tablenames');

// const fields = ['id', 'first', 'last', 'gender', 'age'];

module.exports = {
    // TODO: add foreign key represented values
  find() {
    return db(tablenames.person).select();
    // return db(tablenames.person).select(fields);
  },
    // TODO: get by id, person i_d, clinic_id
  async get(id) {
    return db(tablenames.person)
      .select()
      // .select(fields)
      .where({
        id,
      })
      .first();
  },
};
