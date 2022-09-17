
exports.up = async function(knex) {
    //makes movies_theaters table
    return await knex.schema.createTable("movies_theaters", (table) => {
      table.integer("movie_id").unsigned().notNullable()
      table
          .foreign("movie_id")
          .references("movie_id")
          .inTable("movies")
          .onDelete("cascade")
      table.integer("theater_id").unsigned().notNullable()
      table
          .foreign("theater_id")
          .references("theater_id")
          .inTable("theaters")
          .onDelete("cascade")
      table.boolean("is_showing")
    })
  };
  
  exports.down = async function(knex) {
    //drops movies_theaters table
    return await knex.schema.dropTable("movies_theaters")
  };
  