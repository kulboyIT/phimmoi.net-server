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
                resolve({status: "success", user: {
                    username: newUserItem.username
                }, message: `Tạo mới tài khoản ${newUserItem.username} thành công!!!`});
            } else {
                resolve({status: "fail", message: "username đã tồn tại!!!"});
            }
        } catch (error) {
            reject(error);
        }
    });
}



module.exports = {
    addNewUser: addNewUser
}