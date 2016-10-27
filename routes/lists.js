var express = require('express');
var router = express.Router();
var _ = require('lodash');
var List = require("../models/list");
var foods = require('./foods');

router.use('/', function (req, res, next) {
  req.body = _.pick(req.body, ['listName', 'foods', 'listOwner', 'sharedOwners'])
  next();
})


router.get('/', function (req, res) {
  // console.log(req.user);
  List.find({listOwner: req.user.sub}, function (err, lists) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(lists)
    }
  });
});

router.get('/sharedLists', function (req, res) {
    List.find({sharedOwners: req.user.sub}, function (err, lists) {
        if (err) {
          console.log(err);
          res.status(500).send()
        } else {
           res.json(lists)
        }
    })
});


router.post('/', function (req, res) {
  var list = new List(req.body)
  list.listOwner = req.user.sub;
  list.save(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(list)
    }
  })
})



router.use('/:id', function (req, res, next) {
  List.findOne({ '_id': req.params.id }, function (err, list) {
    if (err) {
      res.status(500).send()
    } else if (!list) {
      res.status(404).send()
    } else {
      res.list = list;
      next()
    }
  })
})


router.get('/:id', function (req, res) {
  res.json(res.list)
})

router.use('/:id/foods', foods);


router.put('/:id', function (req, res) {
  var updatedList = Object.assign(res.list, req.body)
  updatedList.save(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(updatedList)
    }
  })
})

router.delete('/:id', function (req, res) {
  res.list.remove(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.status(204).send()
    }
  })
})

module.exports = router;
