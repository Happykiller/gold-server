var express = require('express');
var fs = require('fs').promises
var aglio = require('aglio')
var router  = express.Router();

router.get('/', function(req, res) {
  
  fs.readFile('markdown.md').then((text) => {
    aglio.render(text.toString(), {
      themeVariables: 'default'
    }, (err, html, warnings) => {
      res.send(html)
    });
  });

});

module.exports = router;