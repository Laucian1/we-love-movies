const router = require("express").Router({ mergeParams: true })
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

router.route("/?is_showing=true")
    .get(controller.listNowShowing)
    .all(methodNotAllowed)

module.exports = router