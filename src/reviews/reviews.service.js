const knex = require("../db/connection");

function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({ review_id })
        .first()
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
}

function destroy(review_id) {
    return knex("reviews")
        .where({ review_id })
        .del()
}

function getCriticById(critic_id) {
    return knex("critics as c")
        .select("c.*")
        .where({ critic_id })
        .first()
}

module.exports = {
    read,
    update,
    delete: destroy,
    getCriticById,
}