import express from "express";
import initRoutes from "./routes/api";
import viewEngineConfig from "./config/viewEngine";
import connectDb from "./config/connectDb";
let app = express();

let host = "localhost";
let port = 3000;

//set root path
app.use(express.static('src/public'));

//set viewengine
viewEngineConfig(app);

//connect to MongoDb
connectDb();

//Initial routes
initRoutes(app);


app.listen(port, host, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log(`Server is running at ${host}:${port}!!!`);
    }
});