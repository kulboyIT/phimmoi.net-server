import Category from "../models/category";

let getAllCategories = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = await Category.getAll();
            resolve(categories);   
        } catch (error) {
            reject(error);
        }
    });
}

let getTitleById = async (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categoryTitle = await Category.getTitleById(categoryId);
            resolve(categoryTitle);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    getAllCategories: getAllCategories,
    getTitleById: getTitleById
}