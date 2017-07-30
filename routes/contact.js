var express = require('express');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    res.render('contact', { title: 'Contact' });
  })
  .post(function(req, res, next) {
    console.log("Item", req.query);
    //res.send('You sent the name "' + req.body.name + '".');

    res.render('contact', { title: 'Contact', notice: 'Mensagem enviada com sucesso!' });
  });


module.exports = router;
