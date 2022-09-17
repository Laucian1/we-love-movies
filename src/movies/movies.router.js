const router = require("express").Router({ mergeParams: true })
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

//base movies route, allows get method
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

//specific movie route, allows get method
router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed)

//theaters playing specific movie route, allows get method
router.route("/:movieId/theaters")
    .get(controller.listTheatersPlaying)
    .all(methodNotAllowed)

//reviews regarding specific movie route, allows get method
router.route("/:movieId/reviews")
    .get(controller.listMovieReviews)
    .all(methodNotAllowed)

module.exports = router