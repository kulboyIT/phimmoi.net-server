import expressEjsExtend from "express-ejs-extend";

let viewConfig = app => {
    app.engine('ejs', expressEjsExtend);
    app.set("view engine", "ejs");
    app.set("views", "./src/views")
}

module.exports = viewConfig;