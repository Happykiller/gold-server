var models  = require('../models');
var express = require('express');
var auth = require('../middlewares/auth');
var router  = express.Router();

router.all('*', auth.verifyJWT_MW);

router.post('/', (req, res) => {
  models.Category.create({
    label: req.body.label,
    creatorId: req.user.id
  },{
    association: models.User
  }).then((category) => {
    res.json({
      id: category.id,
      label: category.label
    });
  });
});

router.delete('/:categoryId', (req, res) => {
  models.Account.update(
    {
      active: false
    },
    {
      where: {
        id: req.params.categoryId
      }
    }
  ).then((result) => {
    res.send(result);
  });
});

router.get('/:categoryId', (req, res) => {
  models.Category.findOne({
      where: {
        id: req.params.categoryId
      },
      attributes: models.Category.getPublicAttributes(),
      include: [{
        as: 'creator',
        model: models.User,
        attributes: models.User.getPublicAttributes()
      }]
  }).then((category) => {
    res.send(category);
  });
});

module.exports = router;