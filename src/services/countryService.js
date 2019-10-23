import Country from "../models/country";

let getAllCountries = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let countries = await Country.getAll();
            resolve(countries);   
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getAllCountries: getAllCountries
}