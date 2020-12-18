const db = require('../../db');
const tablenames = require('../../../db/constants/tablenames');

const fields = ['id', 'name'];

module.exports = {
    // TODO: add foreign key represented values
  find() {
    return db(tablenames.product).select(fields);
  },
    // TODO: get by id, person i_d, clinic_id
  async get(id) {
    return db(tablenames.product)
      .select(fields)
      .where({
        id,
      })
      .first();
  },
};
