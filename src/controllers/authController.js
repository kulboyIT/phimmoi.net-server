import passport from "passport";
import jwt from "jsonwebtoken";

let getLogout = (req, res) => {
  req.logout();
  return res.status(200).send({message: "Đăng xuất thành công!", done: true});
}

let checkLoggedIn = (req, res, next) => {
  console.log(req.body);
  if(req.body.isAuthenticated === 'false') {
    return res.send({message:'You are not logged in!!!', done: false});
  }
  next();
}

let checkLoggedOut = (req, res, next) => {
  console.log(req.body);
  if(req.body.isAuthenticated === 'true') {
    return res.send({message:'You are logged in!!!', done: false});;
  }
  next();
}

let passportAuth = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) { return console.log(err); }
    if (!user) { 
      return res.json({success: false, message: 'Tài khoản hoặc mật khẩu không đúng!!!', data: ''});
    }
    req.logIn(user, function(err) {
      if (err) { res.json({success: false, message: 'Tài khoản hoặc mật khẩu không đúng!!!', data: ''});}
      let payload = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar
      }
      let token = jwt.sign(payload, 'secret', {
        expiresIn: 1440
      });
      return res.send({success: true, message: 'Đăng nhập thành công!!!', data: token});
    });
  })(req, res, next);
}

module.exports = {
  getLogout: getLogout,
  checkLoggedOut: checkLoggedOut,
  checkLoggedIn: checkLoggedIn,
  passportAuth: passportAuth
};
