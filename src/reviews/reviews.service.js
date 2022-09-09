const knex = require("../db/connection");

//gather information for a specific review
function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first()
}

//gather information for a review being updated
function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview)
        .then((data) => data[0])
}

//delete a specific review
function destroy(review_id) {
    return knex("reviews")
        .where({ review_id })
        .del()
}

//gather information for a specific critic and return the lone object
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