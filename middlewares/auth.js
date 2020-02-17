var models = require('../models');
var auth = require('../libs/auth');

let verifyJWT_MW = function(req, res, next){
  let token = (req.method === 'POST') ? req.body.token : req.query.token

  auth.verifyJWTToken(token)
    .then((decodedToken) =>
    {
      models.User.findByPk(decodedToken.data.id).then((user) => {
        req.user = user;
        next();
      });
    })
    .catch((err) =>
    {
      res.status(400)
      .json({
        message: "Invalid auth token provided."
      });
    })
}

module.exports.verifyJWT_MW = verifyJWT_MW;