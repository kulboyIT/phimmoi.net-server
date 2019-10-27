import session from "express-session";
import connectMongo from "connect-mongo";

const MongoStore = connectMongo(session);

let sessionStore = new MongoStore({
    url: "mongodb://localhost:27017/phimmoi",
    autoReconnect: true
    //autoRemove: "native"
})

let config = (app) => {
    app.use(session({
        secret: "secret",
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie:{
            maxAge: 1000 * 60 * 60 * 24
        }
    }));
}

module.exports = {
    config: config,
    sessionStore: sessionStore
}