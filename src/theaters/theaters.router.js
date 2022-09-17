const router = require("express").Router()
const controller = require("./theaters.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

//basic theaters route, lists all theaters and the movies they play
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router