import { category, country, movie } from "../services";

let getNewMovies = async (req, res, next) => {
    let limit = parseInt(req.query.limit);

    try {
        let movieInfo = await movie.getNewMovies(limit);
        if (!movieInfo) {
            return res.status(500).send("Server Error!!!");
        } else {
            return res.status(200).send(movieInfo);
        }
    } catch (error) {
        console.log(error)
    }
}

let getMovieInfo = async (req, res, next) => {
    let movieId = req.params.movieId;

    try {
        let movieInfo = await movie.getMovieById(movieId);
        if (!movieInfo) {
            return res.status(500).send("Server Error!!!");
        } else {
            return res.status(200).send(movieInfo);
        }
    } catch (error) {
        console.log(error)
    }
};

let getMoviesByCategoryId = async (req, res, next) => {
    let categoryId = req.params.categoryId;
    let limit = parseInt(req.query.limit);

    try {
        let movies = await movie.getMoviesByCategoryId(categoryId, limit);
        let categoryTitle = await category.getTitleById(categoryId);

        if (!movies) {
            return res.status(500).send("Server Error!!!");
        } else {
            res.status(200).send(movies);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error!!!");
    }
}

let getMoviesByCountryId = async (req, res, next) => {
    let countryId = req.params.countryId;
    let limit = parseInt(req.query.limit);

    try {
        let movies = await movie.getMoviesByCountryId(countryId, limit);
        let countryName = await country.getTitleById(countryId);

        if (!movies) {
            return res.status(500).send("Server Error!!!");
        } else {
            res.status(200).send(movies);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error!!!");
    }
}

let getMoviesByKeyword = async (req, res, next) => {
    let keyword = req.query.keyword;

    try {
        let movies = await movie.getMoviesByKeyword(keyword, 20);

        if (!movies) {
            return res.status(500).send("Server Error!!!");
        } else {
            res.status(200).send(movies);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error!!!");
    }
}

let getMovies = async (req, res, next) => {
    let limit = parseInt(req.query.limit);
    
    try {
        let movies = await movie.getMoviesByType('movie', limit);
        res.status(200).send(movies);   
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error!");
    }
}

let getSeries = async (req, res, next) => {
    let limit = parseInt(req.query.limit);

    try {
        let movies = await movie.getMoviesByType('series', limit);
        res.status(200).send(movies);   
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error!");
    }
}

module.exports = {
    getMovieInfo: getMovieInfo,
    getMoviesByCategoryId: getMoviesByCategoryId,
    getMoviesByCountryId: getMoviesByCountryId,
    getMovies: getMovies,
    getSeries: getSeries,
    getMoviesByKeyword: getMoviesByKeyword,
    getNewMovies: getNewMovies
};