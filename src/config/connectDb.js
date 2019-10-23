import mongoose from "mongoose";
import bluebird from "bluebird";

let connectDb = () => {
    mongoose.Promise = bluebird;
    
    let url = "mongodb://localhost:27017/phimmoi";
    let option = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    return mongoose.connect(url, option);
}

module.exports = connectDb;