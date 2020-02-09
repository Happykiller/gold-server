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

module.exports.createJWToken = createJWToken;