var models  = require('../models');
var express = require('express');
var auth = require('../libs/auth');
var router = express.Router();

router.post('/', (req, res) => {
    models.User.findAll({
        where: {
          email: req.body.email
        }
    })
    .then((users) => {
        return (users.length === 0) ? Promise.reject("User not found.") : users
    })
    //get the first (unique todo)
    .then((users) => users[0])
    .then((user) => {
        return auth.verifyJWTToken(user.token)
        //token good
        .then((decodedToken) => {
            res.status(200)
            .json({
                success: true,
                token: user.token
            })
            return null
        })
        //token bad
        .catch((err) =>
        {
            models.User.update(
                {
                    token: null
                },
                {
                    returning: true,
                    where: {
                        id: user.id
                    }
                }
            )
            .then((rowsUpdated) => {
                //console.log(rowsUpdated)
            })
            .catch((error) => {
                return Promise.reject("Error while reset token => " . error.message)
            })
            //go create
            return user
        })
    })
    .then((user) =>
    {
        if(user !== null){
            var token = auth.createJWToken({
                sessionData: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                },
                maxAge: 3600
            })
    
            models.User.update(
                {
                    token: token
                },
                {
                    returning: true,
                    where: {
                        id: user.id
                    }
                }
            )
            .then((rowsUpdated) => {
                //console.log(rowsUpdated)
            })
            .catch((error) =>{
                return Promise.reject("Error while updating token => " . error.message)
            })
    
            res.status(200)
            .json({
                success: true,
                token: token
            })
        }
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