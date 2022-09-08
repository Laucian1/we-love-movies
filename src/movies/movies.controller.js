const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
    const data = await service.list(req.query.is_showing)
    const parsed = data.map(({ runtime_in_minutes, ...data}) => {
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

async function listTheatersPlaying(req, res) {
    const data = await service.listTheatersPlaying(req.params.movieId)
    res.json({ data })
}

async function listMovieReviews(req,res) {
    const data = await service.listMovieReviews(req.params.movieId)
    const results = await Promise.all(data.map(async review => {
        const critic = await service.getCriticById(review.critic_id)
        return {...review, critic}
    }))
    res.json({ data: results })
}



module.exports = {
    list: asyncErrorBoundary(list),
    read: [
        asyncErrorBoundary(movieExists), 
        asyncErrorBoundary(read),
    ],
    listTheatersPlaying: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(listTheatersPlaying),
    ],
    listMovieReviews: [
        asyncErrorBoundary(movieExists),
        asyncErrorBoundary(listMovieReviews),
    ],
}