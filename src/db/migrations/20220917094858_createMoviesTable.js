
exports.up = async function(knex) {
    return await knex.schema.createTable("movies", (table) => {
      table.increments("movie_id").primary()
      table.string("title")
      table.string("runtime_in_minutes")
      table.string("rating")
      table.text("description")
      table.string("image_url")
      table.timestamps(true, true)
    })
  };
  
  exports.down = async function(knex) {
    return await knex.schema.dropTable("movies")
  };
  