import {category, country, movie} from "../services";

let getMovieInfo = async (req, res, next) => {
    let movieId = req.params.movieId;
    
    try {
        let movieInfo = await movie.getMovieById(movieId);
        if(!movieInfo) {
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

    try {
        let moviesFiltered = await movie.getMoviesByCategoryId(categoryId, 20);
        let categoryTitle = await category.getTitleById(categoryId);

        let categories = await category.getAllCategories();
        let countries = await country.getAllCountries();
        let movies = await movie.getMoviesByType('movie');
        let series = await movie.getMoviesByType('series');
        let newestMovies = movies.concat(series);

        if(!moviesFiltered) {
            return res.status(500).send("Server Error!!!");
        } else {
            res.status(200)
            .render('main/movieList', {
                categories: categories,
                countries: countries,
                movies: movies,
                series: series,
                newestMovies: newestMovies,
                moviesFiltered: moviesFiltered,
                listTitle: `phim ${categoryTitle.title}`
            });
        }
    } catch (error) {
        console.log(error);
    }
}

let getMoviesByCountryId = async (req, res, next) => {
    let countryId = req.params.countryId;

    try {
        let moviesFiltered = await movie.getMoviesByCountryId(countryId, 20);
        let countryName = await country.getTitleById(countryId);

        let categories = await category.getAllCategories();
        let countries = await country.getAllCountries();
        let movies = await movie.getMoviesByType('movie');
        let series = await movie.getMoviesByType('series');
        let newestMovies = movies.concat(series);

        if(!moviesFiltered) {
            return res.status(500).send("Server Error!!!");
        } else {
            res.status(200)
            .render('main/movieList', {
                categories: categories,
                countries: countries,
                movies: movies,
                series: series,
                newestMovies: newestMovies,
                moviesFiltered: moviesFiltered,
                listTitle: `phim ${countryName.title}`
            });
        }
    } catch (error) {
        console.log(error);
    }
}

let getMovies = async (req, res, next) => {
    try {
        let categories = await category.getAllCategories();
        let countries = await country.getAllCountries();
        let movies = await movie.getMoviesByType('movie', 20);
        let series = await movie.getMoviesByType('series');
        let newestMovies = movies.concat(series);

        res.status(200)
        .render('main/movieList', {
            categories: categories,
            countries: countries,
            movies: movies.slice(0, 8),
            series: series,
            newestMovies: newestMovies,
            moviesFiltered: movies,
            listTitle: "phim lẻ"
        });
    } catch (error) {
        console.log(error);
    }
}

let getSeries = async (req, res, next) => {
    try {
        let categories = await category.getAllCategories();
        let countries = await country.getAllCountries();
        let movies = await movie.getMoviesByType('movie');
        let series = await movie.getMoviesByType('series', 20);
        let newestMovies = movies.concat(series);

        res.status(200)
        .render('main/movieList', {
            categories: categories,
            countries: countries,
            movies: movies,
            series: series.slice(0, 8),
            newestMovies: newestMovies,
            moviesFiltered: series,
            listTitle: "phim bộ"
        });
    } catch (error) {
        console.log(error);
    }
}

let getMoviesByKeyword = async (req, res, next) => {
    let keyword = req.query.keyword;
    
    try {
        let moviesFiltered = await movie.getMoviesByKeyword(keyword, 20);
        let categories = await category.getAllCategories();
        let countries = await country.getAllCountries();
        let movies = await movie.getMoviesByType('movie');
        let series = await movie.getMoviesByType('series');
        let newestMovies = movies.concat(series);

        res.status(200)
        .render('main/movieList', {
            categories: categories,
            countries: countries,
            movies: movies,
            series: series,
            newestMovies: newestMovies,
            moviesFiltered: moviesFiltered,
            listTitle: `từ khóa: ${keyword}`
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMovieInfo: getMovieInfo,
    getMoviesByCategoryId: getMoviesByCategoryId,
    getMoviesByCountryId: getMoviesByCountryId,
    getMovies: getMovies,
    getSeries: getSeries,
    getMoviesByKeyword: getMoviesByKeyword
};