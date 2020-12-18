const { domainToUnicode } = require('url');
const tablenames = require('../constants/tablenames');
const tableorder = require('../constants/tableorder');

const patients = require('../constants/patients');
const lysates = require('../constants/lysates');

const doctors = [
  {first: 'Irena', last: 'Pavilonienė'},
  {first: 'Rugilė', last: 'Pikturnienė'},
  {first: 'Eduardas', last: 'Aleknavičius'},
  {first: 'Abdulla', last: 'El-Hossami'},
  {first: 'Marius', last: 'Strioga'},
  {first: 'Ladislav', last: 'Kelbl'},
  {first: 'Pavol', last: 'Demo'},
  {first: 'Asad', last: 'Saad'},
  {first: 'Sonata', last: 'Šaulytė-Trakymienė'},
  {first: 'Giedrė', last: 'Rutkauskienė'},
  {first: 'Inta', last: 'Jaunalksne'},
  {first: 'Adem', last: 'Gunes'},
  {first: 'František', last: 'Rolinek'},
  {first: 'Jaroslav', last: 'Michalek'},
  {first: 'Guna', last: 'Proboka'},
  {first: 'Linda', last: 'Brokane'},
  {first: 'Jiri', last: 'Prochazka'},
];

/**
 *
 * @param {require('knex')} knex
 */

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await Promise.all(
    // eslint-disable-next-line camelcase
    tableorder.map((table_name) => knex(table_name).del()),
  );
  
  await knex(tablenames.product).insert([
    {name: 'DSL'},
    {name: 'CIK'},
    {name: 'TCV'},
    {name: 'MSC'},
  ]);

  await knex(tablenames.clinic).insert([
    {name: 'Innovita research'},
    {name: 'InMedica'},
    {name: 'Klaipėdos universitetinė ligoninė'},
    {name: 'LSMU Kauno klinikos'},
    {name: 'Santaros klinikų vaikų ligoninė'},
    {name: 'Immucura'},
    {name: 'Verita Life'},
    {name: 'Verita Life Center Hamburg'},
    {name: 'GK klinika'},
    {name: 'I. Kelbauskienės klinika'},
    {name: 'Fakultni nemocnice v Motole'},
    {name: 'Viroterapijas & Integrativas medicinas klinika'},
    {name: 'Amber life'},
  ]);

  await knex(tablenames.lysate).insert(lysates);

  for (let item of doctors) {
    let id = parseInt(await knex(tablenames.person).insert(item).returning('id'));
    await knex(tablenames.doctor).insert({person_id: id});
  };

  for (let item of patients) {
    let id = parseInt(await knex(
      tablenames.person)
      .insert({
        first: item.first, 
        last: item.last})
      .returning('id'));
    await knex(tablenames.patient).insert({
      person_id: id,
      code: item.code,
    });
  };
};
