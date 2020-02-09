var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/:userId', (req, res) => {
  models.User.findByPk(req.params.userId).then((user) => {
    res.send(user);
  })
})


module.exports = router;