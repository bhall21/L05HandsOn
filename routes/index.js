var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/category', function(req, res, next) {
  models.category.findAll({}).then(categoriesFound => {
    res.render('category', {
      categories: categoriesFound
    });
  });
});

router.get('/category/:id', function(req, res, next) {
  let categoryId = parseInt(req.params.id);
  models.category
    .findOne({
      where: {
        category_id: categoryId
      }
    })
    .then(category => {
      res.render('specificCategory', {
        category: category
      });
    });
});

router.post('/category', (req, res) => {
  models.category
    .findOrCreate({
      where: {
        name: req.body.name,
        default_price: req.body.default_price
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('/category');
      } else {
        res.send('This category already exists!');
      }
    });
});

module.exports = router;
