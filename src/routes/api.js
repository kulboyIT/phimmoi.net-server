import express from "express";
import {home, movie} from "../controllers";

let router = express.Router();


/**
 * Initial Routes
 * @param {express app} app
 */
let initRoutes = app => {
    router.get("/", home.getHomePage);

    router.get("/movie/info/:movieId", movie.getMovieInfo);

    return app.use('/', router);
}

module.exports = initRoutes;