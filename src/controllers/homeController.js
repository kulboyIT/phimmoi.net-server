import {category, country} from "../services";

let getHomePage = async (req, res, next) => {
    let categories = await category.getAllCategories();
    let countries = await country.getAllCountries();
 
    res.render('main/master', {
        categories: categories,
        countries: countries
    });
}

module.exports = {
    getHomePage: getHomePage
}