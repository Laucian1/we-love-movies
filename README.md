Welcome to my WeLoveMovies Project!

If you are running this program on your machine, please run "npm install" to ensure all necessary packages are present.


PATHS:


/movies -- Gets a list of all movies in the database.

/movies?is_showing=true -- Gets a list of all currently active movies.

/movies/:movieId -- Gets the movie information of the sepecified movie by id.

/movies/:movieId/theaters -- Gets a list of theaters playing the specified movie by id.

/movies/:movieId/reviews -- Gets a list of all reviews for the specified movie by id.

/reviews/:reviewId/ -- Put an update or delete the specified movie by id.

/theaters -- Gets a list of all theaters, along with the movies currently showing in each theater.


A sample frontend can be found at:
https://github.com/Laucian1/starter-movie-front-end
