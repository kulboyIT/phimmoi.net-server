let getLogout = (req, res) => {
  req.logout();
  return res.status(200).send({message: "Logged out!"});
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
