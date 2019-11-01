import {country} from "../services";


let getAllCountries = async (req, res, next) => {
    try {
        let countries = await country.getAllCountries();
        res.status(200).send(countries);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllCountries: getAllCountries
}