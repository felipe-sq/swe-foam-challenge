exports.up = function (knex) {
  return knex.schema.createTable("images", (table) => {
    table.increments("id").primary();
    table.string("url").notNullable();
    table.boolean("foam").defaultTo(false);
    table.string("category").defaultTo("uncategorized");
    table.string("lastModified").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("images");
};
