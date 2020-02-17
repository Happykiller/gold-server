var models  = require('../models');
var express = require('express');
var auth = require('../middlewares/auth');
var router  = express.Router();

router.all('*', auth.verifyJWT_MW);

router.post('/', (req, res) => {
  models.Account.create({
    label: req.body.label,
    creatorId: req.user.id
  },{
    association: models.User
  }).then((account) => {
    res.json({
      id: account.id,
      label: account.label
    });
  });
});

router.get('/:accountId', (req, res) => {
  models.Account.findOne({
      where: {
        id: req.params.accountId
      },
      attributes: models.Account.getPublicAttributes(),
      include: [{
        as: 'creator',
        model: models.User,
        attributes: models.User.getPublicAttributes()
      }]
  }).then((account) => {
    res.send(account);
  });
});

module.exports = router;