var jwt  = require('jsonwebtoken');
var _ = require('lodash');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

var createJWToken = function(details)
{
  if (typeof details !== 'object')
  {
    details = {}
  }

  if (!details.maxAge || typeof details.maxAge !== 'number')
  {
    details.maxAge = 3600
  }

  details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) =>
  {
    if (typeof val !== "function" && key !== "password")
    {
      memo[key] = val
    }
    return memo
  }, {})

  let token = jwt.sign({
     data: details.sessionData
    }, config.JWT_SECRET, {
      expiresIn: details.maxAge,
      algorithm: 'HS256'
  })

  return token
}

var verifyJWTToken = function(token) {
  return new Promise((resolve, reject) =>
  {
    jwt.verify(token, config.JWT_SECRET, (err, decodedToken) => 
    {
      if (err || !decodedToken)
      {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}

var verifyJWT_MW = function(req, res, next){
  let token = (req.method === 'POST') ? req.body.token : req.query.token

  verifyJWTToken(token)
    .then((decodedToken) =>
    {
      req.user = decodedToken.data
      next()
    })
    .catch((err) =>
    {
      res.status(400)
      .json({
        message: "Invalid auth token provided."
      })
    })
}

module.exports.createJWToken = createJWToken;
module.exports.verifyJWTToken = verifyJWTToken;
module.exports.verifyJWT_MW = verifyJWT_MW;