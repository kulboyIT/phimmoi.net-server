import express from "express";
import {home} from "../controllers";

let router = express.Router();


/**
 * Initial Routes
 * @param {express app} app
 */
let initRoutes = app => {
    router.get("/", home.getHomePage);

    return app.use('/', router);
}

module.exports = initRoutes;