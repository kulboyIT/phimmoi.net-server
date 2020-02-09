import {user} from "../services";

let addNewUser = async (req, res, next) => {
    let newUser = req.body.newUser;
    try {
        let response = await user.addNewUser(newUser);
        console.log(response);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "fail",
            message: "Server Error!!!"
        });
    }
}

module.exports = {
    addNewUser: addNewUser
}