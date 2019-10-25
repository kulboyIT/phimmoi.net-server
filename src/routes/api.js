import express from "express";
import {home, movie, comment} from "../controllers";

let router = express.Router();


/**
 * Initial Routes
 * @param {express app} app
 */
let initRoutes = app => {
    router.get("/", home.getHomePage);

    router.get("/movie/info/:movieId", movie.getMovieInfo);
    router.get("/movie/comments/:movieId", comment.getMovieComments)

    router.get("/category/:categoryId", movie.getMoviesByCategoryId);

    router.get("/country/:countryId", movie.getMoviesByCountryId);

    router.get("/phim-le", movie.getMovies);

    router.get("/phim-bo", movie.getSeries);

    router.get("/search", movie.getMoviesByKeyword);

    router.post("/comment/add-new", comment.addNewComment);

    return app.use('/', router);
}

module.exports = initRoutes;