import express from "express";
import bodyParser from "body-parser";
import initRoutes from "./routes/api";
import viewEngineConfig from "./config/viewEngine";
import connectDb from "./config/connectDb";
import session from "./config/session";
import passport from "passport";
import connectFlash from "connect-flash";

let app = express();

let host = "localhost";
let port = 3000;

//set root path
app.use(express.static('src/public'));

//use body parser
app.use(bodyParser.urlencoded({extended: true}));

//connect to MongoDb
connectDb();

//session config
session.config(app);

//use connect flash
app.use(connectFlash());

//view engine config
viewEngineConfig(app);

//passport config
app.use(passport.initialize());
app.use(passport.session());

//Initial routes
initRoutes(app);


app.listen(port, host, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log(`Server is running at ${host}:${port}!!!`);
    }
});