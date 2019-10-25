import mongoose from "mongoose";
let Schema = mongoose.Schema;

let CountrySchema = new Schema({
    title: {type: String, trim: true},
    movie_number: {type: Number, default: 0},
    create_at: {type: Number, default: Date.now}
});

CountrySchema.statics = {
    createNew(item) {
        return this.create(item);
    },

    getAll() {
        return this.find({},{
            _id: 1, 
            title: 1
        }).
        exec();
    },

    getTitleById(countryId) {
        return this.findById({
            _id: countryId
        }, {
            title: 1
        }).
        exec();
    }
}

module.exports = mongoose.model("country", CountrySchema);