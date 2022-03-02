const db = require("../api/data/dbConfig");

module.exports = {
  find,
  findById,
  update,
};

function find() {
  return db("images").select("*");
}

function findById(id) {
  return db("images").where({ id }).first();
}

function update(id, changes) {
  return db("images").where({ id }).update(changes);
}
