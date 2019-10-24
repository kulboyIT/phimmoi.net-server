import {category, country, movie} from "../services";
import categoryTitle from "../../lang/categories";

let getHomePage = async (req, res, next) => {
    let categories = await category.getAllCategories();
    let countries = await country.getAllCountries();
    let movies = await movie.getMoviesByType('movie');
    let series = await movie.getMoviesByType('series');
    let actionMovies = await movie.getMoviesByCategory(categoryTitle.ACTION_VN);
    let scifiMovies = await movie.getMoviesByCategory(categoryTitle.SCIFI_VN);
    let scaryMovies =  await movie.getMoviesByCategory(categoryTitle.SCARY_VN);
    let newestMovies = movies.concat(series);
 
    res.render('main/homePage', {
        categories: categories,
        countries: countries,
        movies: movies,
        series: series,
        newestMovies: newestMovies,
        actionMovies: actionMovies,
        scifiMovies: scifiMovies,
        scaryMovies: scaryMovies
    });
}

module.exports = {
    getHomePage: getHomePage
}