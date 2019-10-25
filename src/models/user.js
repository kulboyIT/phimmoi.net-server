import mongoose from "mongoose";
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, trim: true},
    password: String,
    avatar: {type: String, default: "/images/user-avatar/avatar1.png"},
    first_name: {type: String, trim: true},
    last_name: {type: String, trim: true},
});

UserSchema.statics = {
    createNew(item) {
        return this.create(item);
    },

    getUserById(userId) {
        return this.findById(userId, {
            avatar: 1,
            first_name: 1,
            last_name: 1
        }).
        exec();
    }
}

module.exports = mongoose.model("user", UserSchema);