//error handler for non-existant routes
function notFound(req, res, next) {
    next({ status: 404, message: `Path not found: ${req.originalUrl}` })
}

module.exports = notFound