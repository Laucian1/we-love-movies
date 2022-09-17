
exports.up = async function(knex) {
    return await knex.schema.createTable("critics", (table) => {
      table.increments("critic_id").primary()
      table.string("preferred_name")
      table.string("surname")
      table.string("organization_name")
      table.timestamps(true, true)
    })
  };
  
  exports.down = async function(knex) {
    return await knex.schema.dropTable("critics")
  };
  