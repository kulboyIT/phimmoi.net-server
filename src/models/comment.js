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
    }
}

module.exports = mongoose.model("comment", CommentSchema);