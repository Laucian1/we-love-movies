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

function read(movie_id) {
    return knex("movies").select("*").where({ movie_id }).first()
}

function listTheatersPlaying(movie_id) {
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.*")
    .where({ movie_id })
}

async function listMovieReviews(movie_id) {
    return knex("reviews as r")
    .select("r.*")
    .where({ movie_id })
}

function getCriticById(critic_id) {
    return knex("critics as c")
    .select("c.*")
    .where("c.critic_id", critic_id)
    .first()
}

module.exports = {
    list,
    listNowShowing,
    listTheatersPlaying,
    listMovieReviews,
    read,
    getCriticById
}