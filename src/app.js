if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors")

const errorHandler = require("./errors/errorHandler")
const notFound = require("./errors/notFound")

const moviesRouter = require("./movies/movies.router")
const reviewsRouter = require("./reviews/reviews.router")
const theatersRouter = require("./theaters/theaters.router")

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json())
app.get("/", (req, res) => res.status(301).redirect("/movies"))

app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("/theaters", theatersRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app;
