import mongoose from "mongoose";
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    user_id: String,
    movie_id: String,
    content: {type: String, trim: true},
    create_at: {type: Number, default: Date.now}
});

CommentSchema.statics = {
    createNew(item) {
        return this.create(item);
    },

    getByMovieId(movieId, limit) {
        return this.find({
            movie_id: movieId
        }).
        sort({create_at: -1}).
        limit(limit).
        exec();
    }
}

module.exports = mongoose.model("comment", CommentSchema);