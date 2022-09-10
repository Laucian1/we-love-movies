const knex = require("../db/connection")

//gets all information from theaters, movies, and movies_theaters tables
//where the movie is currently showing
function list() {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .where({ is_showing: true })
}

module.exports = {
    list,
}