const knex = require("../db/connection")

function list(nowShowing) {
    //if is_showing=true query paramater is present,
    //select only those distinct movies
    if (nowShowing) {
        return knex("movies as m")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .select("m.*")
            .distinct()
            .where({ is_showing: true })
    }
    //else return full list
    return knex("movies")
}

//select specific movie by id
function read(movie_id) {
    return knex("movies")
        .where({ movie_id })
        .first()
}

//select theaters where movie id is present
function listTheatersPlaying(movie_id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .where({ movie_id })
}

//select reviews where movie id is present
async function listMovieReviews(movie_id) {
    return knex("reviews")
        .where({ movie_id })
}

//select critic info by id
function getCriticById(critic_id) {
    return knex("critics")
        .where({ critic_id })
        .first()
}

module.exports = {
    list,
    listTheatersPlaying,
    listMovieReviews,
    read,
    getCriticById
}