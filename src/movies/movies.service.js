const knex = require("../db/connection")

function list() {
    return knex("movies")
    .select("movie_id as id", "title", "runtime_in_minutes", "rating", "description", "image_url")
}

function listNowShowing() {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.movie_id as id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
    .where({"mt.is_showing": true})
}

module.exports = {
    list,
    listNowShowing,
}