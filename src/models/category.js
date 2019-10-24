import mongoose from "mongoose";
let Schema = mongoose.Schema;

let CategorySchema = new Schema({
    title: {type: String, trim: true},
    movie_number: {type: Number, default: 0},
    create_at: {type: Number, default: Date.now}
});

CategorySchema.statics = {
    createNew(item) {
        return this.create(item);
    },

    getAll() {
        return this.find({}, {_id: 0, title: 1}).exec();
    },

    getIdByTitle(categoryTitle) {
        return this.findOne({
            title: categoryTitle
        }, {_id: 1}).
        exec();
    },

    getTitleById(categoryId) {
        return this.findById({
            _id: categoryId
        }, {title: 1}).
        exec();
    }
}

module.exports = mongoose.model("category", CategorySchema);