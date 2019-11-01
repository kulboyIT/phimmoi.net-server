import passport from "passport";

let getLogout = (req, res) => {
  req.logout();
  return res.status(200).send({message: "Đăng xuất thành công!"});
}

let checkLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    console.log('logged out!!');
    return res.redirect("http://localhost:8080/");
  }
  next();
}

let checkLoggedOut = (req, res, next) => {
  if(req.isAuthenticated()){
    console.log('logged in!!');
    return res.redirect("http://localhost:8080/");
  }
  next();
}

let getLoginStatus = (req, res, next) => {
  if(!req.isAuthenticated()){
    return res.send(false);
  } else {
    return res.send(true);
  }
}

let passportAuth = (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
}

module.exports = {
  getLogout: getLogout,
  checkLoggedOut: checkLoggedOut,
  checkLoggedIn: checkLoggedIn,
  getLoginStatus: getLoginStatus,
  passportAuth: passportAuth
};
