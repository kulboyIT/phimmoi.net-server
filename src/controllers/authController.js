let getLogout = (req, res) => {
  req.logout();
  return res.status(200).send({message: "Đăng xuất thành công!"});
}

let checkLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    return res.redirect("http://localhost:8080/");
  }
  next();
}

let checkLoggedOut = (req, res, next) => {
  if(req.isAuthenticated()){
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

module.exports = {
  getLogout: getLogout,
  checkLoggedOut: checkLoggedOut,
  checkLoggedIn: checkLoggedIn,
  getLoginStatus: getLoginStatus
};
