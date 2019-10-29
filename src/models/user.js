import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: { type: String, trim: true },
    password: String,
    avatar: { type: String, default: "/images/user-avatar/avatar1.png" },
    first_name: { type: String, trim: true, default: "" },
    last_name: { type: String, trim: true, default: "" },
    is_admin: { type: Number, default: 0 }
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
    },

    getUserByUsername(username) {
        return this.findOne({
            username: username
        }).
            exec();
    },

    findUserByIdForSessionToUse(id) {
        return this.findById(id, {password: 0 }).exec();
    },
}

UserSchema.methods = {
    comparePassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

module.exports = mongoose.model("user", UserSchema);