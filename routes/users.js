var express = require('express');
var router = express.Router();
var _ = require('lodash');
var User = require("../models/users");

router.use(function (req, res, next) {
  req.body = _.pick(req.body, ['firstName', 'lastName', 'email'])
  next()
})

router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(users)
    }
  });
});


router.post('/', function (req, res) {
  var user = new User(req.body)
  user.save(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(user)
    }
  })
})


router.use('/:id', function (req, res, next) {
  User.findOne({ '_id': req.params.id }, function (err, user) {
    if (err) {
      res.status(500).send()
    } else if (!user) {
      res.status(404).send()
    } else {
      res.user = user;
      next()
    }
  })
})

router.get('/:id', function (req, res) {
  res.json(res.user)
})

router.put('/:id', function (req, res) {
  var updatedUser = Object.assign(res.user, req.body)
  updatedUser.save(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(updatedUser)
    }
  })
})

router.delete('/:id', function (req, res) {
  res.user.remove(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.status(204).send()
    }
  })
})

module.exports = router;