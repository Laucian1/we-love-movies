const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
    const data = await service.list()
    const parsed = data.map(({ runtime_in_minutes, ...data}) => {
        return { runtime_in_minutes: Number(runtime_in_minutes), ...data }
    })
    res.json({data: parsed})
}

async function listNowShowing(req, res) {
    const data = await service.listNowShowing()
    const parsed = data.map(({ runtime_in_minutes, ...data }) => {
        return { runtime_in_minutes: Number(runtime_in_minutes), ...data }
    })
    res.json({data: parsed})
}

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId)
    if (movie) {
        res.locals.movie = movie
        return next()
    }
    next({ status: 404, message: "Movie cannot be found."})
}

function read(req, res) {
    const { movie: data } = res.locals
    res.json({ data })
}

module.exports = {
    list: asyncErrorBoundary(list),
    listNowShowing: asyncErrorBoundary(listNowShowing),
    read: [
        asyncErrorBoundary(movieExists), 
        asyncErrorBoundary(read),
    ]
}