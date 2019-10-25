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

let getTitleById = async (coutryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let countryName = await Country.getTitleById(coutryId);
            resolve(countryName);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAllCountries: getAllCountries,
    getTitleById: getTitleById
}