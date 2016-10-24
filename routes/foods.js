var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Food = require("../models/food");

router.use('/', function (req, res, next) {
  req.body = _.pick(req.body, ['itemName', 'description', 'price'])
  next();
})

router.get('/', function (req, res) {
  Food.find({}, function (err, foods) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(foods)
    }
  });
});


router.post('/', function (req, res) {
  var food = new Food(req.body)
  food.save(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(food)
    }
  })
})


router.use('/:id', function (req, res, next) {
  Food.findOne({ '_id': req.params.id }, function (err, food) {
    if (err) {
      res.status(500).send()
    } else if (!food) {
      res.status(404).send()
    } else {
      res.food = food;
      next()
    }
  })
})

router.get('/:id', function (req, res) {
  res.json(res.food)
})

router.put('/:id', function (req, res) {
  var updatedFood = Object.assign(res.food, req.body)
  updatedFood.save(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(updatedFood)
    }
  })
})

router.delete('/:id', function (req, res) {
  res.food.remove(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.status(204).send()
    }
  })
})

module.exports = router;
