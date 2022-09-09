const knex = require("../db/connection");

function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first()
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview)
        .then((data) => data[0])
}

function destroy(review_id) {
    return knex("reviews")
        .where({ review_id })
        .del()
}

function getCriticById(criticId) {
    return knex("critics")
        .select("*")
        .where({ critic_id: criticId })
        .first()
}

module.exports = {
    read,
    update,
    delete: destroy,
    getCriticById,
}