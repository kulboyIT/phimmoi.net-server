import {movie} from "../services";

let getMovieInfo = async (req, res, next) => {
    let movieId = req.params.movieId;
    
    try {
        let movieInfo = await movie.getMovieById(movieId);
        if(!movieInfo) {
            return res.status(500).send("Server Error!!!");
        } else {
            return res.status(200).send(movieInfo);
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    getMovieInfo: getMovieInfo
};