const db = require('../db-config');

module.exports = {
  find,
  findBy,
  findById,
  add
  // remove,
  // update
};

function find() {
  return db('users').select('id', 'username', 'department');
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}