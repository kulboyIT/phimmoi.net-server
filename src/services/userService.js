import User from "../models/user";
import bcrypt from "bcrypt";

const saltRounds = 7;

let addNewUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        let salt = bcrypt.genSaltSync(saltRounds);
        try {
            let usernameNotExist = await User.getUserByUsername(newUser.username);
            if(!usernameNotExist) {
                let newUserItem = {
                    username: newUser.username,
                    password: bcrypt.hashSync(newUser.password, salt),
                    avatar: newUser.avatar,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name
                }
                await User.createNew(newUserItem);
                resolve({type: "succeed", message: "Thành công"});
            } else {
                resolve({type: "succeed", message: "username đã tồn tại!!!"});
            }
        } catch (error) {
            reject(error);
        }
    });
}



module.exports = {
    addNewUser: addNewUser
}