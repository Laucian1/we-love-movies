const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//find a specific review based on input review id and store it
//for future use
async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId)
    if (review) {
        res.locals.review = review
        return next()
    }
    next({ status: 404, message: "Review cannot be found."})
}

async function update(req, res) {
    console.log(req.body.data)
    //set up new review object based on selected review id
    const newReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    }
    //update new info and gather old info to update review
    await service.update(newReview)
    const updatedReview = await service.read(newReview.review_id)
    //format response to include critic information
    const reviewResponse = {
        ...updatedReview,
        critic: await service.getCriticById(updatedReview.critic_id),
    }
    res.json({ data: reviewResponse })
}

//delete selected review
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