
exports.up = async function(knex) {
    //makes critics table
    return await knex.schema.createTable("critics", (table) => {
      table.increments("critic_id").primary()
      table.string("preferred_name")
      table.string("surname")
      table.string("organization_name")
      table.timestamps(true, true)
    })
  };
  
  exports.down = async function(knex) {
    //drops critics table
    return await knex.schema.dropTable("critics")
  };
  