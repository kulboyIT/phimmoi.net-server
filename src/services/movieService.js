import Movie from "../models/movie";
import Category from "../models/category";
import Country from "../models/country";

const LIMIT_NUMBER = 8;
/**
 * Get movies with type and limit number
 * @param {Number} limitNumb 
 * @param {String} type
 */
let getMoviesByType = (type, limitNumb = LIMIT_NUMBER) => {
    return new Promise(async (resolve, reject) => {
        try {
            let movies = await Movie.getMoviesByType(type, limitNumb);
            resolve(movies);
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Get movies by category's name with limit number
 * @param {String} categoryTitle 
 * @param {Number} limitNumb 
 */
let getMoviesByCategoryTitle = (categoryTitle, limitNumb = LIMIT_NUMBER) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categoryId = await Category.getIdByTitle(categoryTitle);
            let movies = await Movie.getMoviesByCategoryId(categoryId._id, limitNumb);
            resolve(movies);
        } catch (error) {
            reject(error);
        }
    })
}

let getMoviesByCategoryId = (categoryId, limitNumb = LIMIT_NUMBER) => {
    return new Promise(async (resolve, reject) => {
        try {
            let movies = await Movie.getMoviesByCategoryId(categoryId, limitNumb);
            resolve(movies);
        } catch (error) {
            reject(error);
        }
    })
}

let getMoviesByCountryId = (countryId, limitNumb = LIMIT_NUMBER) => {
    return new Promise(async (resolve, reject) => {
        try {
            let movies = await Movie.getMoviesByCountryId(countryId, limitNumb);
            resolve(movies);
        } catch (error) {
            reject(error);
        }
    })
}

let getMovieById = (movieId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let movieInfo = await Movie.getMovieById(movieId);
            
            let countries = movieInfo.countries.map(async (countryId) => {
                return await Country.getTitleById(countryId);
            });

            let categories = movieInfo.categories.map(async (categoryId) => {
                return await Category.getTitleById(categoryId);
            });

            let responseData = {
                movieInfo: movieInfo,
                movieCategories: await Promise.all(categories),
                movieCountries: await Promise.all(countries)
            }

            resolve(responseData);
        } catch (error) {
            reject(error);
        }
    })
}

let getMoviesByKeyword = (keyword, limitNumb = LIMIT_NUMBER) => {
    return new Promise(async (resolve, reject) => {
        try {
            let movie = await Movie.getMoviesByKeyword(keyword,limitNumb);
            resolve(movie);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getMoviesByType: getMoviesByType,
    getMoviesByCategoryTitle: getMoviesByCategoryTitle,
    getMovieById: getMovieById,
    getMoviesByCategoryId: getMoviesByCategoryId,
    getMoviesByCountryId: getMoviesByCountryId,
    getMoviesByKeyword: getMoviesByKeyword
}