const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId)
    if (review) {
        res.locals.review = review
        return next()
    }
    next({ status: 404, message: "Review cannot be found."})
}

async function update(req, res) {
    const newReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    }
    const updatedReview = await service.update(newReview)
    const review = await service.read(res.locals.review.review_id)
    const reviewResponse = {
        ...review,
        critic: await service.getCriticById(res.locals.review.critic_id),
    }
    res.json({ data: reviewResponse })
}

async function destroy(req, res) {
    const { review } = res.locals
    await service.delete(review.review_id)
    res.sendStatus(204)
}

module.exports = {
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update),
    ],
    delete: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy),
    ]
    
}