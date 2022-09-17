const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
    //list movies with (or without) query paramater present
    const data = await service.list(req.query.is_showing)
    //parse the runtime to number rather than string
    const parsed = data.map(({ runtime_in_minutes, ...data}) => {
        return { runtime_in_minutes: Number(runtime_in_minutes), ...data }
    })
    res.json({data: parsed})
}

//find specific movie by id or return error
async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId)
    //add movie to res.locals.movie for use in read and specific list functions
    if (movie) {
        res.locals.movie = movie
        return next()
    }
    next({ status: 404, message: "Movie cannot be found."})
}

//return data for specific movie
function read(req, res) {
    const { movie: data } = res.locals
    res.json({ data })
}

//list theaters playing specific movie
async function listTheatersPlaying(req, res) {
    const data = await service.listTheatersPlaying(req.params.movieId)
    res.json({ data })
}

//list reviews for specific movie
async function listMovieReviews(req,res) {
    const data = await service.listMovieReviews(req.params.movieId)
    //wait for all reviews to be mapped with critic information
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