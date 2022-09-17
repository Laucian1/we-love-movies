
exports.up = async function(knex) {
    //makes theaters table
    return await knex.schema.createTable("theaters", (table) => {
      table.increments("theater_id").primary()
      table.string("name")
      table.string("address_line_1")
      table.string("address_line_2")
      table.string("city")
      table.string("state")
      table.string("zip")
      table.timestamps(true, true)
    })
  };
  
  exports.down = async function(knex) {
    //drops theaters table
    return await knex.schema.dropTable("theaters")
  };
  