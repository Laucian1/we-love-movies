const knex = require("../db/connection")

function list() {
    return knex("movies")
    .select("movie_id as id", "title", "runtime_in_minutes", "rating", "description", "image_url")
}

module.exports = {
    list,
}