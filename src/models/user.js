import mongoose from "mongoose";
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, trim: true},
    password: String,
    avatar: {type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzlDPRr1xSW0lukY2EmVpAx5Ye1S8H5luUVOK2IqFdcsjCDQxK"},
    first_name: {type: String, trim: true},
    last_name: {type: String, trim: true},
});

UserSchema.statics = {
    createNew(item) {
        return this.create(item);
    }
}

module.exports = mongoose.model("user", UserSchema);