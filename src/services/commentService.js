import Comment from "../models/comment";
import User from "../models/user";

let getMovieComments = (movieId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let comments = await Comment.getByMovieId(movieId);
            let commentsPromise = comments.map(async (comment) => {
                let userInfo = await User.getUserById(comment.user_id);
                userInfo = userInfo.toObject();
                return {
                    content: comment.content,
                    userInfo: userInfo
                }
            });
            resolve(await Promise.all(commentsPromise));
        } catch (error) {
            reject(error);
        }
    });
}

let addNewComment = (movieId, userId, commentContent) => {
    return new Promise(async (resolve, reject) => {
        try {
            let commentItem = {
                content: commentContent,
                movie_id: movieId,
                user_id: userId
            };
        
            await Comment.createNew(commentItem);
            resolve(true);   
        } catch (error) {
            reject(false);
        }
    });
}

module.exports = {
    getMovieComments: getMovieComments,
    addNewComment: addNewComment
}