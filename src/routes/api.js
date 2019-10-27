import express from "express";
import {home, movie, comment, user, auth} from "../controllers";
import initPassportLocal from "../controllers/passportController/local";
import passport from "passport";

let router = express.Router();

initPassportLocal();

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

    router.post("/comment/add-new", auth.checkLoggedIn, comment.addNewComment);

    router.post("/user/add-new", auth.checkLoggedOut, user.addNewUser);

    router.post("/login", auth.checkLoggedOut, passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    }));
    
    router.get("/logout", auth.checkLoggedIn, auth.getLogout);

    return app.use('/', router);
}

module.exports = initRoutes;