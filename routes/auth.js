var models  = require('../models');
var express = require('express');
var auth = require('../libs/auth');
var router = express.Router();

router.get('/', (req, res) => {
    models.User.findAll({
        where: {
          email: req.query.email
        }
    })
    .then((users) => (!users) ? Promise.reject("User not found.") : users)
    .then((users) => users[0])
    .then((user) => {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    })
    .then((user) =>
    {
        var token = auth.createJWToken({
            sessionData: user,
            maxAge: 3600
        })
        res.status(200)
        .json({
            success: true,
            token: token
        })
    })
    .catch((error) =>
    {
        res.status(401)
        .json({
            message: error.message || "Validation failed. Given email and password aren't matching."
        })
    })
})


module.exports = router;