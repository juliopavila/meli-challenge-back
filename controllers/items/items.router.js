const express = require('express');
const controller = require('./items.controller');

let itemsRouter = express.Router();

itemsRouter.get('/items', async (req, res, next) => {
  const { query } = req.query;
  controller.getProductsController({ query }, res, next);
});

itemsRouter.get('/items/:id', async (req, res, next) => {
  const { id } = req.params;
  controller.getProductByIdController({ id }, res, next);
});

module.exports = itemsRouter;
