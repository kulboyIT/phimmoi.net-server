let getLogout = (req, res) => {
  req.logout();
  return res.status(200).send({message: "Đăng xuất thành công!"});
}

let checkLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    return res.redirect("/");
  }
  next();
}

let checkLoggedOut = (req, res, next) => {
  if(req.isAuthenticated()){
    return res.redirect("/");
  }
  next();
}

module.exports = {
  getLogout: getLogout,
  checkLoggedOut: checkLoggedOut,
  checkLoggedIn: checkLoggedIn
};
