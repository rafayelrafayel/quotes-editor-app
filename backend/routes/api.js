const express = require('express');
const quotes = require('./quotes');
const ApiRouter = express.Router();
ApiRouter.use('/quotes', quotes);
module.exports = ApiRouter;