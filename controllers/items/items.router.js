const express = require('express');
const controller = require('./items.controller');

let itemsRouter = express.Router();

itemsRouter.get('/:query', async (req, res, next) => {
  const { query } = req.params;
  controller.getProductsController({ query }, res, next);
});
//itemsRouter.get('/:id', async (req, res, next) => {});

module.exports = itemsRouter;
