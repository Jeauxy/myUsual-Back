var express = require('express');
var router = express.Router();
// var _ = require('lodash');
var Store = require('../models/store');


// router.use(function (req, res, next) {
//   req.body = _.pick(req.body, ['name','inventory', 'type'])
//   next()
// })

router.get('/', function (req, res) {
  Store.find({}, function (err, stores) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(stores)
    }
  })
});


router.post('/', function (req, res) {
  var store = new Store(req.body)
  store.save(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(store)
    }
  })
});


router.use('/:id', function (req, res, next) {
  Store.findOne({ '_id': req.params.id }, function (err, store) {
    if (err) {
      res.status(500).send()
    } else if (!store) {
      res.status(404).send()
    } else {
      res.store = store;
      next()
    }
  })
});

router.get('/:id', function (req, res) {
  res.json(res.store)
});

router.put('/:id', function (req, res) {
  var updatedStore = Object.assign(res.store, req.body)
  updatedStore.save(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(updatedStore)
    }
  })
});

router.delete('/:id', function (req, res) {
  res.store.remove(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.status(204).send()
    }
  })
});

module.exports = router;
