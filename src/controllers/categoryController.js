import {category} from "../services";


let getAllCategories = async (req, res, next) => {
    try {
        let categories = await category.getAllCategories();
        res.status(200).send(categories);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllCategories: getAllCategories
}