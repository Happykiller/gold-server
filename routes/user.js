var models  = require('../models');
var express = require('express');
var auth = require('../libs/auth');
var router  = express.Router();

router.all('*', auth.verifyJWT_MW)

router.get('/:userId', (req, res) => {
  models.User.findByPk(req.params.userId).then((user) => {
    res.send(user);
  })
})


module.exports = router;