import mongoose from "mongoose";
let Schema = mongoose.Schema;

let CountrySchema = new Schema({
    country: {type: String, trim: true},
    movie_number: {type: Number, default: 0},
    create_at: {type: Number, default: Date.now}
});

CountrySchema.statics = {
    createNew(item) {
        return this.create(item);
    },

    getAll() {
        return this.find({},{_id: 0, country: 1}).exec();
    }
}

module.exports = mongoose.model("country", CountrySchema);