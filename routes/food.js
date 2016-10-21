var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Food = require("../models/food");

router.use('/', function (req, res, next) {
  req.body = _.pick(req.body, ['itemName', 'description', 'price'])
  next();
})
