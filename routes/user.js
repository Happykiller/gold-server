var models  = require('../models');
var express = require('express');
var auth = require('../middlewares/auth');
var router  = express.Router();

router.all('*', auth.verifyJWT_MW)

router.get('/:userId', (req, res) => {
  models.User.findOne({
    where: {
      id: req.params.userId
    },
    attributes: models.User.getPublicAttributes(),
  }).then((user) => {
    res.send(user);
  });
});

module.exports = router;