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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  });

app.use(express.json())
app.get("/", (req, res) => res.status(301).redirect("/movies"))

app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("/theaters", theatersRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app;
