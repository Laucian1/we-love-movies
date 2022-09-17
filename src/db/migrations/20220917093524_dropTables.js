
exports.up = function(knex) {
  // Deletes ALL existing tables
  return knex.schema.dropTableIfExists("reviews")
    .then(() => knex.schema.dropTableIfExists("movies_theaters"))
    .then(() => knex.schema.dropTableIfExists("critics"))
    .then(() => knex.schema.dropTableIfExists("movies"))
    .then(() => knex.schema.dropTableIfExists("theaters"));
};

exports.down = function(knex) {
  
};
